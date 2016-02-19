// Challenge Progress points

CHALLENGE_PROGRESS_CORRECT = 10;
CHALLENGE_PROGRESS_WRONG = -5;

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
    var lesson = Template.currentData();
    resetChallenge(lesson);
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
            case QTYPE.WORD_PAIRING:
                return "Match the pairs";
            case QTYPE.REARRANGE:
                return "Arrange this phrase in Vietnamese";
        }
    },
    completed: function() {
        return Session.equals("challengeProgress", 100);
    }
});


Template.feedback.helpers({
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
                nextQuestion(this);
                break;
        }
    },

    "keypress": function(ev) {

        if (ev.keyCode === KEYCODE_ENTER) { // Enter key
            $("#submit").click();
        }
    },
})

// Private helpers

function nextQuestion(lesson) {

    var qTotal = _.keys(lesson.phrases).length;
    var phraseIndex = Session.get("phraseIndex");
    var qType = lesson.phrases[phraseIndex].qType;

    // Cleanup previous question states
    cleanupQuestion(qType);

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

    // Initialize the question
    qType = lesson.phrases[phraseIndex].qType;
    setupQuestion(lesson, qType);
}

function setupQuestion(lesson, qType) {
    switch (qType) {
        case QTYPE.TRANSLATE_VE:
        case QTYPE.LISTEN_VE:
            setupTranslate(lesson);
            break;

        case QTYPE.TRUE_FALSE:
            break;

        case QTYPE.MULTIPLE_CHOICES_TRANSLATION:
        case QTYPE.MULTIPLE_CHOICES_TRANSLATION_PIC:
            setupMultipleChoicesTranslation(lesson);
            break;

        case QTYPE.WORD_PAIRING:
            setupWordPairing(lesson);
            break;

        case QTYPE.REARRANGE:
            setupRearrange(lesson);
            break;

        default:
            return;
    }
}

function cleanupQuestion(qType) {

    Session.set("feedback", "");

    switch (qType) {
        case QTYPE.MULTIPLE_CHOICES_TRANSLATION:
        case QTYPE.MULTIPLE_CHOICES_TRANSLATION_PIC:
            cleanupMultipleChoicesTranslation();
            break;

        case QTYPE.TRANSLATE_VE:
        case QTYPE.LISTEN_VE:
        case QTYPE.TRUE_FALSE:
        case QTYPE.WORD_PAIRING:
        case QTYPE.REARRANGE:
        default:
            return;
    }
}

function computeProgress(answerScore) {
    var challengeProgress = Session.get("challengeProgress");

    if (challengeProgress + answerScore >= 100 ) {
        challengeProgress = 100;
        challengeComplete(Template.currentData());
    } else if ( challengeProgress + answerScore < 0) {
        challengeProgress = 0;
    } else {
        challengeProgress += answerScore;
    }

    Session.set("isCorrect", answerScore >= 0);
    Session.set("challengeProgress", challengeProgress);
}

function challengeComplete(lesson) {
    var now = new Date().getTime();
    var midnight = new Date();
    midnight.setHours(0,0,0,0);
    midnight = midnight.getTime();

    var user = Meteor.user();
    var userId = Meteor.userId();

    // Mark unlocked question
    var unlockedLessons = user.profile.unlockedLessons;
    unlockedLessons[lesson.name].percentCompleted = 100;
    unlockedLessons[lesson.name].timestamp = now;

    Meteor.users.update(userId, {$set: { "profile.unlockedLessons": unlockedLessons}});

    // If this is the first challenge completed over midnight, increment day streak
    if (now >= midnight && user.profile.timeLastChallengeCompleted <= midnight) {
        Meteor.users.update(userId, {$inc: {"profile.dayStreak": 1}});
    }

    // Mark last challenge completed
    Meteor.users.update(userId, {$set: { "profile.timeLastChallengeCompleted": now}});

    // Increase xp
    Meteor.users.update(userId, {$inc: { "profile.xp": Session.get('xpGained')}});

    // Unlock new level
    var nextLevel = user.profile.level + 1;
    if (user.profile.xp >= LEVEL_XP_REQUIREMENTS[nextLevel]) {
        Session.set("reachedNewLevel", true);
        Meteor.call('unlockLevel', userId, nextLevel);
    }

}

//
// Global functions
//

answer = function(lesson) {

    var phrase = lesson.phrases[Session.get("phraseIndex")];
    var qType = phrase.qType;

    var answerScore = 0;

    switch (qType) {
        case QTYPE.TRANSLATE_VE:
        case QTYPE.LISTEN_VE:
            answerScore = aTranslateVE(phrase);
            break;
        case QTYPE.TRUE_FALSE:
            answerScore = aTrueFalse(phrase);
            break;
        case QTYPE.MULTIPLE_CHOICES_TRANSLATION:
        case QTYPE.MULTIPLE_CHOICES_TRANSLATION_PIC:
            answerScore = aMultipleChoicesTranslation(phrase);
            break;
        case QTYPE.WORD_PAIRING:
            answerScore = aWordPairing();
        case QTYPE.REARRANGE:
            answerScore = aRearrange();
            break;
    }

    computeProgress(answerScore);
}

enableSubmitButton = function() {
    $("#submit").prop('disabled', false);
    Session.set("qState", QSTATE.ANSWERED);
}

resetChallenge = function(lesson) {

    Session.set("reachedNewLevel", false);

    // phraseIndex tracks the current index of the phrase/question.
    // It can be random if all the phrases are exhausted
    Session.set("phraseIndex", 0);

    // qNumber increments naturally and is exposed to user how many questions they have been asked
    Session.set("qNumber", 1);
    Session.set("challengeProgress", 0);
    Session.set("qState", QSTATE.PROMPT);

    // the amount of xp user gained if answered perfectly
    Session.set("xpGained", 100);
    var qType = lesson.phrases[0].qType;
    setupQuestion(lesson, qType);
}
