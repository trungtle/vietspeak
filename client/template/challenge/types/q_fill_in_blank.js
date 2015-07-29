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
        var checkedAnswers = _.where(Session.get("choices"), {
                checked: true
        });
        
        
        if(checkedAnswers.length > 0 && true) { 
            if (clickChoice.displayedWord === checkedAnswers[0].displayedWord) {
                clickChoice.isCorrect = false;
                clickChoice.checked = false;
            }


        } else {

            clickChoice.checked = !clickChoice.checked;
            if(_.indexOf(expectedAnswers, clickChoice.displayedWord) !== -1) {
                clickChoice.isCorrect = true;
            }
        }
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
    var checkedAnswers = _.where(Session.get("choices"), {
        checked: true
    });
    checkedAnswers = _.map(checkedAnswers, function(answer) {
        return answer.displayedWord;
    });

    var expectedAnswers = Session.get("expectedAnswers");


    var unionCheckExpect = _.union(checkedAnswers, expectedAnswers);

    var answerCorrect = false;
    var feedback = "no feedback";
    if(expectedAnswers.length === checkedAnswers.length &&
        unionCheckExpect.length === checkedAnswers.length) { 
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
    var choices = phrase.otherChoices;
    choices.push(phrase.answer);

    
    choices = _.map(choices, function(choice) {
        return {
            checked: false,
            isCorrect: false,
            displayedWord: choice,
        };
    });

    
   
    choices = _.shuffle(choices);
    
    var expectedAnswers = new Array();
    expectedAnswers.push(phrase.answer);
    Session.set("choices", choices);
    Session.set("expectedAnswers", expectedAnswers);
   
}
