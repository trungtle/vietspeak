Template.qTrueFalse.helpers({

    question: function() {
        var phrase = this.phrases[Session.get("phraseIndex")];
        return phrase.question;
    },
    isCorrect: function() {
        return Session.get("isCorrect");
    },
    gotFeedback: function() {
        return Session.equals("qState", QSTATE.CONTINUE);
    },
    trueChecked: function() {
        return Session.get("trueChecked") && !Session.equals("qState", QSTATE.PROMPT);
    },
    falseChecked: function() {
        return Session.get("falseChecked") && !Session.equals("qState", QSTATE.PROMPT);
    }
});

Template.qTrueFalse.events({

    "click .choice": function(ev) {
        // Select a choice
        var selectedIndex = 0;

        if (ev.target === $('#choice-true')[0]) {
            Session.set("trueChecked", true);
            Session.set("falseChecked", false);
        }
        else if (ev.target === $('#choice-false')[0]) {
            Session.set("trueChecked", false);
            Session.set("falseChecked", true);
        }

        // Allow for answering
        enableSubmitButton();
    },

    "keypress": function(ev) {

        switch (ev.keyCode) {

            default: break;

            // Simulate selecting options
            case KEYCODE_ONE:
                $('#choice-true').click();
                break;

            case KEYCODE_TWO:
                $('#choice-fasle').click();
                break;
        }

    }
});

// ----------------------
// Public functions
// ----------------------

aTrueFalse = function(phrase) {
    Session.set("feedback", phrase.answer ? "True" : "False");
    if (phrase.answer == true) {
        return Session.get("trueChecked")? CHALLENGE_PROGRESS_CORRECT :
                                            CHALLENGE_PROGRESS_WRONG;
    }
    else {
        return Session.get("falseChecked")? CHALLENGE_PROGRESS_CORRECT:
                                             CHALLENGE_PROGRESS_WRONG;
    }
}
