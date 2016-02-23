const CHOICE_NUM = 4;

Template.qFillInBlank.helpers({

    phrase: function() {
        var phrase = this.phrases[Session.get("phraseIndex")];
        var prompt = phrase.vnPhraseLower + " _____ " + phrase.vnPhraseUpper;
        return prompt;
    },

    choices: function() {
        return Session.get("choices");
    },
    gotFeedback: function() {
        return Session.equals("qState", QSTATE.CONTINUE);
    },
});

Template.qFillInBlank.events({

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

setupFillInBlank = function(lesson) {
    pickChoices(lesson);
}

aFillInBlank = function(phrase) {
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
    expectedAnswers.push(phrase.answer);
    
    var choices = phrase.wrongChoices;
    

    choices = _.map(choices, function(choice) {
        return {
            checked: false,
            isCorrect: false,
            displayedWord: choice,
        };
    });

    // push answer object onto the choices
    choices.push(  {
            checked: false,
            isCorrect: true,
            displayedWord: phrase.answer,
        });
   
    choices = _.shuffle(choices);
    
    Session.set("choices", choices);
    Session.set("expectedAnswers", expectedAnswers);
   
}
