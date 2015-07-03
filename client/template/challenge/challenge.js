// Key codes
const KEYCODE_ENTER = 13;
const KEYCODE_ONE = 49;
const KEYCODE_TWO = 50;
const KEYCODE_THREE = 51;
const KEYCODE_FOUR = 52;

// Question type
QTYPE = {
	RANDOM: 0,
	TRANSLATE_VE: 1,
	LISTEN_VE: 2,
	MULTIPLE_CHOICES_TRANSLATION: 3,
	MULTIPLE_CHOICES_TRANSLATION_PIC: 4,
	REARRANGE: 5,				// Rearrange words in a Vietnamese phrase
	FILL_IN_BLANK: 6,			// Fill in the blank for a Vietnamese phrase
	WORD_PAIRING: 7,			// Pairing between English & Vietnamese
	REPLACE_WRONG_WORD: 8, 		// Use English hint, click on wrong word in Vietnamese phrase
	SELECT_CORRECT_SPELLING: 9, // Play a tone, and select the correct spelling for the tone
	TRANSLATE_EV: 10,			// Teach typing in Vietnamese
	TRUE_FALSE: 11,
	MULTIPLE_CHOICES_MULTIPLE_ANSWERS: 12, // Multiple choices with multiple answers allowed
	MULTIPLE_CHOICES_MULTIPLE_ANSWERS_AUDIO: 13, // Multiple choices with multiple answers allowed
};

// Question state
QSTATE = {
	PROMPT: 0,  		// Player still choosing an answer
	ANSWERED: 1,		// Player has picked an answer
	GRADING: 2, 		// Grading player's answer
	CONTINUE: 3 		// Player got a result for answer, reviewing, and ready for next
};

Template.challenge.onCreated(function() {

	// Initialize to the first question in the lesson
	Session.set("qNumber", 0);
	Session.set("challengeProgress", 0);
	Session.set("qState", QSTATE.PROMPT);

});

Template.challenge.rendered = function() {


}

//
// Helpers
//

Template.challenge.helpers({
	qNumber: function() {
		return Session.get("qNumber") + 1;
	},

	qTotal: function() {
		return _.keys(this.phrases).length;
	},

	instruction: function() {
		var qType = this.phrases[Session.get("qNumber")].qType;
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
});


Template.feedback.helpers({
	submitButtonIcon: function() {
		var qState = Session.get("qState");

		switch(qState) {
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
		switch(qState) {
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

	"keyup": function (ev) {

	    if (ev.keyCode === KEYCODE_ENTER) { // Enter key
	    	$("#submit").click();
	    }
	},
})

// Private helpers

function nextQuestion(lesson) {

	var qTotal = _.keys(lesson.phrases).length;
	var qNumber = Session.get("qNumber");

	// User has looped through all the phrases, pick a random phrase
	if (qNumber >= qTotal) {
		Session.set("randomQuestion", true);
	}

	if (Session.get("randomQuestion")) {
		qNumber = _.random(qTotal - 1);
	} else {
		qNumber++;
	}

	Session.set("qNumber", qNumber);
}

function computeProgress(isCorrect)
{
	var challengeProgress = Session.get("challengeProgress");
	if (isCorrect) {

		Session.set("isCorrect", true);

		if (challengeProgress + 10 > 100) {
			challengeProgress = 100;
			completeChallenge();
		} else {
			challengeProgress += 10;
		}
		Session.set("challengeProgress", challengeProgress);

	} else {

		Session.set("isCorrect", false);

		if (challengeProgress - 5 < 0) {
			challengeProgress = 0;
		} else {
			challengeProgress -= 5;
		}
		Session.set("challengeProgress", challengeProgress);
	}
}

// Global functions

answer = function(lesson) {

	var phrase = lesson.phrases[Session.get("qNumber")];
	var qType = phrase.qType;

	var isCorrect = false;

	switch(qType) {
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
	}

	computeProgress(isCorrect);
}

enableSubmitButton = function() {
	$("#submit").prop('disabled', false);
	Session.set("qState", QSTATE.ANSWERED);
}
