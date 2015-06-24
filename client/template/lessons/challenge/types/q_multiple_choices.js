const CHOICE_NUM = 4;

Template.qMultipleChoices.rendered = function() {

}

Template.qMultipleChoices.onCreated(function() {

	var lesson = Template.currentData();
	Session.set("isEV", true);  // English phrase, Vietnamese choices
	pickChoices(lesson);

});

Template.qMultipleChoices.helpers({

	phrase: function() {
		var isEV = Session.get("isEV");
		var phrase = this.phrases[Session.get("qNumber")];
		return isEV ? _.first(phrase.english) : phrase.vietnamese;
	},

	choices: function() {
		return Session.get("choices");
	},


});

Template.qMultipleChoices.events({

	"click .choice": function(ev) {
		// Select a choice
		var choices = Session.get("choices");
		var selectedIndex = 0;

		if (ev.target === $('#choice-1')[0]) {
			selectedIndex = 0;
		} else if (ev.target === $('#choice-2')[0]) {
			selectedIndex = 1;
		} else if (ev.target === $('#choice-3')[0]) {
			selectedIndex = 2;
		} else if (ev.target === $('#choice-4')[0]) {
			selectedIndex = 3;
		}

		// Uncheck all other choices
		for (var i = 0; i < CHOICE_NUM; ++i) {
			if (i === selectedIndex) {
				choices[i].checked = true;
			} else {
				choices[i].checked = false;
			}
		}

		// Update session
		Session.set("choices", choices);

		// Allow for answering
		enableSubmitButton();
	},

	"keypress": function(ev) {

		switch(ev.keyCode) {

			default:
				break;

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

aMultipleChoices = function(phrase) {
	var userAnswer = _.findWhere(Session.get("choices"), {checked: true});

	return userAnswer.vietnamese === phrase.vietnamese;
}

// ----------------------
// Private functions
// ----------------------

function pickChoices(lesson)
{
	var isEV = Session.get("isEV");
	var qNumber = Session.get("qNumber");
	var phrase = lesson.phrases[qNumber];
	var choices = _.without(lesson.phrases, phrase); // Remove the phrase from choice list
	var choices = _.sample(choices, CHOICE_NUM - 1); // Minus one since we will add it later
	choices.push(phrase);
	choices = _.shuffle(choices);

	for (var i = 0; i < choices.length; ++i) {
		choices[i] = _.extend(choices[i], {
			hotkey: i+1,
			checked: false,
			translation: isEV ? choices[i].vietnamese : choices[i].english[0],
		});
	}
	Session.set("choices", choices);
}
