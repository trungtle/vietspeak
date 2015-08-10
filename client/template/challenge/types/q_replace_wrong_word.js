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
});

Template.qReplaceWrongWord.events({

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
    }

});

// ----------------------
// Public functions
// ----------------------

setupReplaceWrongWord = function(lesson) {
    pickChoices(lesson);
}

aReplaceWrongWord = function(phrase) {
    var checkedChoices = _.where(Session.get("choices"), {
        checked: true
    });
    checkedChoices = _.map(checkedChoices, function(answer) {
        return answer.displayedWord;
    });

    var expectedAnswers = Session.get("expectedAnswers");


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

// ----------------------
// Private functions
// ----------------------

function pickChoices(lesson) {
    var phraseIndex = Session.get("phraseIndex");
    var phrase = lesson.phrases[phraseIndex];
    
    var expectedAnswers = new Array();
    // expectedAnswers.push(phrase.answer);
    
    // base this RWW question on random existing FIB question
    var possibleQuestions = _.where(lesson.phrases, {qType:QTYPE.FILL_IN_BLANK});
    var question = _.sample(possibleQuestions, 1).pop();
    // console.log(question);

    function toWordObj (choice) {
        return {    
                    word: choice,
                    isWrong: false    
                };
    };
    // select an incorrect word to put into the phrase
    var wrongWord = { 
                        word : _.sample(question.wrongChoices, 1).pop(),
                        isWrong : true
                     };

    // add attributes to phrasewords
    console.log(question.vnPhraseLower);
    var phraseWords = s.words(question.vnPhraseLower);
    console.log(phraseWords);
    
    phraseWords = _.map(phraseWords, toWordObj);
    
    phraseWords.push(wrongWord);
    phraseWords =phraseWords.concat(_.map(s.words(question.vnPhraseUpper), toWordObj));

    
    var choices = new Array();
    
    Session.set("choices", choices);
    Session.set("expectedAnswers", expectedAnswers);
    Session.set("phraseWords", phraseWords);
   
}
