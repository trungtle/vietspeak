// Key codes
const KEYCODE_ENTER = 13;
const KEYCODE_ONE = 49;
const KEYCODE_TWO = 50;
const KEYCODE_THREE = 51;
const KEYCODE_FOUR = 52;

// Challenge Progress points

const CHALLENGE_PROGRESS_CORRECT = 10;
const CHALLENGE_PROGRESS_WRONG = 5;

// XP

const XP_WRONG = 5;

// Question state
QSTATE = {
    PROMPT: 0, // Player still choosing an answer
    ANSWERED: 1, // Player has picked an answer
    GRADING: 2, // Grading player's answer
    CONTINUE: 3 // Player got a result for answer, reviewing, and ready for next
};

Template.challenge.onCreated(function() {
    resetChallenge();
});

//
// Helpers
//

Template.challenge.helpers({
    qNumber: function() {
        return Session.get("qNumber");
    },

    qTotal: function() {
        return _.keys(this.phrases).length;
    },

    instruction: function() {
        var qType = this.phrases[Session.get("phraseIndex")].qType;
        switch (qType) {
            case QTYPE.TRANSLATE_VE:
            case QTYPE.LISTEN_VE:
                return "Translate to English";
            case QTYPE.MULTIPLE_CHOICES_TRANSLATION:
                return "Match with correct answer";
            case QTYPE.MULTIPLE_CHOICES_TRANSLATION_PIC:
                return "Match with correct picture";
            case QTYPE.TRUE_FALSE:
                return "True or False";
        }
    },
    completed: function() {
        return Session.equals("challengeProgress", 100);
    }
});


Template.feedback.helpers({
    submitButtonIcon: function() {
        var qState = Session.get("qState");

        switch (qState) {
            case QSTATE.CONTINUE:
                return "fa fa-hand-o-right";

            case QSTATE.ANSWERED:
                $("#submit").prop("disabled", false);
                return "fa fa-check";

            case QSTATE.PROMPT:
            default:
                $("#submit").prop("disabled", true);
                return "fa fa-check";

        }
    },
    feedback: function() {
        return Session.get("feedback");
    },

    isCorrect: function() {
        return Session.get("isCorrect");
    },

    gotFeedback: function() {
        return Session.equals("qState", QSTATE.CONTINUE);
    },

    gotAnswer: function() {
        return Session.equals("qState", QSTATE.ANSWERED) || Session.equals("qState", QSTATE.CONTINUE);
    }
});

//
// Events
//

Template.challenge.events({
    "click #submit": function(ev) {

        var qState = Session.get("qState");
        switch (qState) {
            case QSTATE.PROMPT:
            default:
                // Do nothing
                break;

            case QSTATE.ANSWERED:
                Session.set("qState", QSTATE.CONTINUE);
                answer(this);
                break;

            case QSTATE.CONTINUE:
                Session.set("qState", QSTATE.PROMPT);
                $("#answer-text").text("");
                nextQuestion(this);
                break;
        }
    },

    "keyup": function(ev) {

        if (ev.keyCode === KEYCODE_ENTER) { // Enter key
            $("#submit").click();
        }
    },
})

// Private helpers

function nextQuestion(lesson) {

    var qTotal = _.keys(lesson.phrases).length;
    var phraseIndex = Session.get("phraseIndex");

    // User has looped through all the phrases, pick a random phrase
    if (phraseIndex >= qTotal - 1) {
        Session.set("randomQuestion", true);
    }

    if (Session.get("randomQuestion")) {
        phraseIndex = _.random(qTotal - 1);
    }
    else {
        phraseIndex++;
    }

    Session.set("phraseIndex", phraseIndex);

    // Increment question number
    var qNumber = Session.get("qNumber");
    Session.set("qNumber", qNumber + 1);
}

function computeProgress(isCorrect) {
    var challengeProgress = Session.get("challengeProgress");
    if (isCorrect) {

        Session.set("isCorrect", true);

        if (challengeProgress + CHALLENGE_PROGRESS_CORRECT >= 100) {
            challengeProgress = 100;
            challengeComplete(Template.currentData());
        }
        else {
            challengeProgress += CHALLENGE_PROGRESS_CORRECT;
        }
        Session.set("challengeProgress", challengeProgress);

    }
    else {

        Session.set("isCorrect", false);

        if (challengeProgress - CHALLENGE_PROGRESS_WRONG < 0) {
            challengeProgress = 0;
        }
        else {
            challengeProgress -= CHALLENGE_PROGRESS_WRONG;
        }
        Session.set("challengeProgress", challengeProgress);
    }
}

function challengeComplete(lesson) {
    var completedLessons = Meteor.user().profile.completedLessons;
    console.log(completedLessons);
    if(!_.contains(completedLessons, lesson.name)) {
        completedLessons.push(lesson.name);
    }
    Meteor.users.update(Meteor.userId(), {$set: { "profile.completedLessons": completedLessons}});
}

//
// Global functions
//

answer = function(lesson) {

    var phrase = lesson.phrases[Session.get("phraseIndex")];
    var qType = phrase.qType;

    var isCorrect = false;

    switch (qType) {
        case QTYPE.TRANSLATE_VE:
        case QTYPE.LISTEN_VE:
            isCorrect = aTranslateVE(phrase);
            break;
        case QTYPE.TRUE_FALSE:
            isCorrect = aTrueFalse(phrase);
            break;
        case QTYPE.MULTIPLE_CHOICES_TRANSLATION:
        case QTYPE.MULTIPLE_CHOICES_TRANSLATION_PIC:
            isCorrect = aMultipleChoicesTranslation(phrase);
            break;
        case QTYPE.WORD_PAIRING:
            isCorrect = aWordPairing();
            break;
    }

    computeProgress(isCorrect);
}

enableSubmitButton = function() {
    $("#submit").prop('disabled', false);
    Session.set("qState", QSTATE.ANSWERED);
}

resetChallenge = function() {
    Session.set("phraseIndex", 0); // phraseIndex can sometimes be random
    Session.set("qNumber", 1); // qNumber increments naturally
    Session.set("challengeProgress", 0);
    Session.set("qState", QSTATE.PROMPT);
    Session.set("xpGained", 100); // the amount of xp user gained if answered perfectly
}
