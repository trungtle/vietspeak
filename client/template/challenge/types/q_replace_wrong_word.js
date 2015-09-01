const CHOICE_NUM = 4;

Template.qReplaceWrongWord.helpers({

    phraseWords: function() {
        return Session.get("phraseWords");
    },

    choices: function() {
        return Session.get("choices");
    },
    gotFeedback: function() {
        return Session.equals("qState", QSTATE.CONTINUE);
    },
    englishTranslation: function() {
        return Session.get("englishTranslation");
    },
    replaceEnabled: function() { // toggles clickability of words in phrase
        return getReplaceEnabled();
    },
    showMultipleChoice: function() {
        return !getReplaceEnabled();
    },
    animationEnabled: function (){
        return Session.get("animationEnabled");
    }
});


Template.qReplaceWrongWord.events({

// @TODO -- generic MC template base
    "click .choice": function(ev) {

        // Select a choice
        var choices = Session.get("choices");
        var expectedAnswers = Session.get("expectedAnswers");
        var clickWord = ev.target.id;

        var clickChoice = _.findWhere(choices, {displayedWord: clickWord});
        var checkedChoices = _.where(choices, {
                checked: true
        });
        
        var ONLY_ALLOW_ONE_ANSWER = true; //  placeholder for generic multiple choice  template work 
        
        if(checkedChoices.length && ONLY_ALLOW_ONE_ANSWER) { 
            // if clicked on a checked choice, then uncheck it (outside of this block)
            // otherwise uncheck the previously checked choice
            if(clickChoice.displayedWord !== checkedChoices[0].displayedWord) {
                checkedChoices[0].checked = false;
            }

        }
        clickChoice.checked = !clickChoice.checked;
        
        // Update session
        Session.set("choices", choices);

        // Allow for answering
        enableSubmitButton();
    },


    "click .phraseWord": function (ev) {
        var phraseWords = Session.get("phraseWords");

        var clickWord = ev.target.textContent;
        var selectedWord = _.findWhere(phraseWords, {word: clickWord});
            
        if (selectedWord.isWrong) { // user selected the word that needs to be replaced
            // show multiple choice selection
            Session.set("replaceEnabled", false);
        } else { // user selected a word that doesn't need to be replaced
            
            if(!Session.get("pointDeduction")) { // halve possible score for question
                Session.set("pointDeduction", CHALLENGE_PROGRESS_CORRECT/2);
            }
            // @TODO -- see the console log.
            console.log("TODO: add prompt/animation for wrong choice");
            Session.set("animationEnabled", true);

        }
    }

});

// ----------------------
// Public functions
// ----------------------

setupReplaceWrongWord = function(lesson) {
    pickChoices(lesson);
}

aReplaceWrongWord = function(phrase) {
    var answerScore = aMultipleChoice(phrase);
    var pointDeduction = Session.get("pointDeduction");

// deduct points for not selecting wrong word in phrase on first try
    if (answerScore == CHALLENGE_PROGRESS_CORRECT) {
        answerScore -= pointDeduction;

    }
    return answerScore;
}

// ----------------------
// Private functions
// ----------------------

// @TODO -- generic MC template base
// check if multiple choice answer is correct
function aMultipleChoice(phrase) {
    var checkedChoices = _.where(Session.get("choices"), {
        checked: true
    });
    checkedChoices = _.map(checkedChoices, function(answer) {
        return answer.displayedWord;
    });

    var expectedAnswers = Session.get("expectedAnswers");

// @TODO -- look into using isCorrect fields to make below more readable
    var unionCheckExpect = _.union(checkedChoices, expectedAnswers);

    var answerCorrect = false;
    var feedback = "no feedback";
    if(expectedAnswers.length === checkedChoices.length &&
        unionCheckExpect.length === checkedChoices.length) { 
        // user checked only the correct answers
        answerCorrect = true
    } else {
        feedback = s.toSentence(expectedAnswers);
    }

    Session.set("feedback", feedback);

    return answerCorrect? CHALLENGE_PROGRESS_CORRECT :
                            CHALLENGE_PROGRESS_WRONG;
}

function pickChoices(lesson) {
    var phraseIndex = Session.get("phraseIndex");
    var phrase = lesson.phrases[phraseIndex];
    
    
    // base this RWW question on random existing FIB question
    var possibleQuestions = _.where(lesson.phrases, {qType:QTYPE.FILL_IN_BLANK});
    var question = _.sample(possibleQuestions, 1).pop();

// setup question data
    setupPhraseWords(question);

    var wrongAnswers = question.wrongChoices;
    var rightAnswers = new Array();
    rightAnswers.push(question.answer);

    setupMultipleChoice(wrongAnswers, rightAnswers);
  
    
    Session.set("replaceEnabled", true);
    Session.set("animationEnabled", false);

    Session.set("pointDeduction", 0); // used for wrong selection of incorrect word
}

// helper
function toChoiceObj (correct, word) {
    return {
        displayedWord: word,
        isCorrect: correct,
        checked: false 
    };
}

// @TODO -- generic MC template base
// both inputs are lists of words/phrases
function setupMultipleChoice(wrongAnswers, rightAnswers) {
    // 
    Session.set("expectedAnswers", rightAnswers);

    // setup choice object creation functions
    var toRightChoice = _.partial(toChoiceObj, true);
    var toWrongChoice = _.partial(toChoiceObj, false);
    
// setup multiple choices:
    wrongAnswers = _.sample(wrongAnswers, CHOICE_NUM - rightAnswers.length);
    
    rightAnswers = _.map(rightAnswers, toRightChoice);
    wrongAnswers = _.map(wrongAnswers, toWrongChoice);
    

    var choices = wrongAnswers.concat(rightAnswers);
    choices = _.shuffle(choices);

    Session.set("choices", choices);

}

// helper
function toWordObj (wrongVal, choice) {
    return {    
        word: choice,
        isWrong: wrongVal    
    };
};

// used to create displayed phraseWords objects
function setupPhraseWords(question) {

    var toWrongWordObj = _.partial(toWordObj, true);
    var toCorrectWordObj = _.partial(toWordObj, false);
    
    var wrongWord = toWrongWordObj( _.sample(question.wrongChoices, 1).pop());

    // add attributes to phrasewords
    var phraseWords = s.words(question.vnPhraseLower);
    
    phraseWords = _.map(phraseWords, toCorrectWordObj);
    
    // put all word objects of phrase into a single array
    phraseWords.push(wrongWord);
    phraseWords =phraseWords.concat(_.map(s.words(question.vnPhraseUpper), toCorrectWordObj));
    Session.set("phraseWords", phraseWords);

    var englishTranslation = question.english[0];
    Session.set("englishTranslation", englishTranslation);
}

// template helper helper
function getReplaceEnabled(){
    return Session.get("replaceEnabled");
}