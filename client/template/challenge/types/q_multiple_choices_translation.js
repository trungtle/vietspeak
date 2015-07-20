const CHOICE_NUM = 4;

Template.qMultipleChoicesTranslation.helpers({

    phrase: function() {
        var isEV = Session.get("isEV");
        var phrase = this.phrases[Session.get("phraseIndex")];
        return isEV ? _.first(phrase.english) : phrase.vietnamese;
    },

    choices: function() {
        return Session.get("choices");
    },
    isCorrect: function() {
        return Session.get("isCorrect");
    },
    gotFeedback: function() {
        return Session.equals("qState", QSTATE.CONTINUE);
    },
    hasImage: function() {
        var choice = this;
        var qType = choice.qType;
        return qType === QTYPE.MULTIPLE_CHOICES_TRANSLATION_PIC;
    }
});

Template.qMultipleChoicesTranslation.events({

    "click .choice, .image-hint": function(ev) {

        // Select a choice
        var choices = Session.get("choices");
        var selectedIndex = 0;

        if (ev.target === $('.choice-1')[0] || ev.target === $('.choice-1')[1]) {
            selectedIndex = 0;
        }
        else if (ev.target === $('.choice-2')[0] || ev.target === $('.choice-2')[1]) {
            selectedIndex = 1;
        }
        else if (ev.target === $('.choice-3')[0] || ev.target === $('.choice-3')[1]) {
            selectedIndex = 2;
        }
        else if (ev.target === $('.choice-4')[0] || ev.target === $('.choice-4')[1]) {
            selectedIndex = 3;
        }

        // Uncheck all other choices
        for (var i = 0; i < CHOICE_NUM; ++i) {
            if (i === selectedIndex) {
                choices[i].checked = true;
            }
            else {
                choices[i].checked = false;
            }
        }

        // Update session
        Session.set("choices", choices);

        // Allow for answering
        enableSubmitButton();
    },

    "keypress": function(ev) {

        switch (ev.keyCode) {

            default: break;

            // Simulate selecting options
            case KEYCODE_ONE:
                    console.log(choices[i]);

                $('#choice-0').click();
                break;

            case KEYCODE_TWO:
                    $('#choice-1').click();
                break;

            case KEYCODE_THREE:
                    $('#choice-2').click();
                break;

            case KEYCODE_FOUR:
                    $('#choice-3').click();
                break;
        }
    }
});

// ----------------------
// Public functions
// ----------------------

setupMultipleChoicesTranslation = function(lesson) {
    Session.set("isEV", true); // English phrase, Vietnamese choices
    pickChoices(lesson);
}

aMultipleChoicesTranslation = function(phrase) {
    var userAnswer = _.findWhere(Session.get("choices"), {
        checked: true
    });

    if (Session.get("isEV")) {
        Session.set("feedback", phrase.vietnamese);
    }
    else {
        Session.set("feedback", phrase.english[0]);
    }

    var answerCorrect = userAnswer.vietnamese === phrase.vietnamese;
    return answerCorrect? CHALLENGE_PROGRESS_CORRECT :
                            CHALLENGE_PROGRESS_WRONG;
}

// ----------------------
// Private functions
// ----------------------

function pickChoices(lesson) {
    var isEV = Session.get("isEV");
    var phraseIndex = Session.get("phraseIndex");
    var phrase = lesson.phrases[phraseIndex];
    var qType = phrase.qType;

    // Remove the phrase from correct choice from sample list
    var choices = _.without(lesson.phrases, phrase);

    // Reject other choices that are not of the same question type
    choices = _.reject(choices, function(choice) {
        return choice.qType !== qType;
    });

    // Minus one choice since we will re-add the correct choice later
    var choices = _.sample(choices, CHOICE_NUM - 1);
    choices.push(phrase);

    // Randomize!
    choices = _.shuffle(choices);

    // Add hotkey and other properties
    for (var i = 0; i < choices.length; ++i) {
        choices[i] = _.extend(choices[i], {
            hotkey: i + 1,
            checked: false,
            translation: isEV ? choices[i].vietnamese : choices[i].english[0],
        });
    }

    Session.set("choices", choices);
}
