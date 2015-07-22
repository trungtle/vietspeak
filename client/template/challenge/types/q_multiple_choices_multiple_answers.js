const CHOICE_NUM = 4;

Template.qMultipleChoicesMultipleAnswers.helpers({

    phrase: function() {
        var phrase = this.phrases[Session.get("phraseIndex")];
        return _.first(phrase.english);
    },

    choices: function() {
        return Session.get("choices");
    },
    gotFeedback: function() {
        return Session.equals("qState", QSTATE.CONTINUE);
    },
});

Template.qMultipleChoicesMultipleAnswers.events({

    "click .choice": function(ev) {

        // Select a choice
        var choices = Session.get("choices");
        var expectedAnswers = Session.get("expectedAnswers");
        var clickWord = ev.target.id;

        var clickChoice = _.findWhere(choices, {displayedWord: clickWord});

        clickChoice.checked = !clickChoice.checked;
        if(_.indexOf(expectedAnswers,clickChoice.displayedWord) !== -1) {
            clickChoice.isCorrect = true;
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

setupMultipleChoicesMultipleAnswers = function(lesson) {
    pickChoices(lesson);
}

aMultipleChoicesMultipleAnswers = function(phrase) {
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
    var vnPhrases = phrase.vietnamese;
    var choices = lesson.phrases;
    var expectedAnswers = phrase.vietnamese;
    

    vnPhrases = _.map(vnPhrases, function(phrase) { 
                    return {
                        vietnamese: phrase
                    };
                });
    // Reject other choices that are not MCT(P) or contain vn phrases of current question
    choices = _.filter(choices, function(choice) {
        var choiceNotMCT = choice.qType === QTYPE.MULTIPLE_CHOICES_TRANSLATION;
        var choiceNotMCTP = choice.qType === QTYPE.MULTIPLE_CHOICES_TRANSLATION_PIC;
        var choiceVnNotInSolutions = !_.contains(expectedAnswers, choice.vietnamese);
        return  (choiceNotMCT || choiceNotMCTP) && choiceVnNotInSolutions;
    });
    
    // Minus one choice since we will re-add the correct choice later
    var choices = _.sample(choices, CHOICE_NUM - expectedAnswers.length);
    
    choices = choices.concat(vnPhrases);
    // Randomize!
    choices = _.shuffle(choices);
    
    // Add hotkey and other properties
    _.map(choices, function(choice) {
        return _.extend(choice, {
            checked: false,
            isCorrect: false,
            displayedWord: choice.vietnamese,
        });
    });
    
    Session.set("choices", choices);
    Session.set("expectedAnswers", expectedAnswers);
   
}
