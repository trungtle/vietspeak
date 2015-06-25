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
	MULTIPLE_CHOICES: 3,
	MULTIPLE_CHOICES_PIC_VE: 4,
	REARRANGE: 5,
	FILL_IN_BLANK: 6,
	MATCHING: 7,
	REPLACE_WRONG_WORD: 8, 		// Click on wrong word, retype it
	SELECT_CORRECT_SPLEEING: 9, // 12 phrases flowing through
	TRANSLATE_EV: 10,
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
});

//
// Helpers
//

Template.challenge.helpers({
	submitButtonIcon: function() {
		Session.setDefault("qState", QSTATE.PROMPT);
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

	qNumber: function() {
		return Session.get("qNumber");
	},

	qTotal: function() {
		return _.keys(this.phrases).length;
	},

	instruction: function() {
		Session.setDefault("qType", _.first(this.phrases).qtype);

		switch (Session.get("qType")) {
			case QTYPE.TRANSLATE_VE:
			case QTYPE.LISTEN_VE:
				return "Translate to English";
			case QTYPE.MULTIPLE_CHOICES:
				return "Match with correct answer";
			case QTYPE.MULTIPLE_CHOICES_PIC_VE:
				return "Match with correct picture";
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

	"keypress": function (ev) {

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

	// Set question type and phrase
	Session.set("qType", lesson.phrases[qNumber].qtype);
}

answer = function(lesson) {

	var phrase = lesson.phrases[Session.get("qNumber")];
	var isCorrect = false;

	switch(Session.get("qType")) {
		case QTYPE.TRANSLATE_VE:
		case QTYPE.LISTEN_VE:
			isCorrect = aTranslateVE(phrase);
			break;
		case QTYPE.MULTIPLE_CHOICES:
			isCorrect = aMultipleChoices(phrase);
			break;
	}

	var challengeProgress = Session.get("challengeProgress");
	if (isCorrect) {
		Session.set("isCorrect", true);
		Session.set("challengeProgress", challengeProgress + 10);
	} else {
		Session.set("feedback", phrase.english[0]);
		Session.set("isCorrect", false);
		Session.set("challengeProgress", challengeProgress -5);
	}
}

enableSubmitButton = function() {
	$("#submit").prop('disabled', false);
	Session.set("qState", QSTATE.ANSWERED);
}
