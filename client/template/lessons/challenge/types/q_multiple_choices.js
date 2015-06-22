const CHOICE_NUM = 4;

Template.qTranslateVE.rendered = function() {
    if(!this._rendered) {      	
      	this._rendered = true;      
    }
}

Template.qMultipleChoices.helpers({

	phrase: function() {
		var phrase = this.phrases[Session.get("qNumber")];
		return _.first(phrase.english);
	},

	choices: function() {

		var qNumber = Session.get("qNumber");
		Session.setDefault("qInitialized" + qNumber, false);

		// First time initialized
		if (Session.get("qInitialized" + qNumber) == false) {
			var phrase = this.phrases[qNumber];
			var choices = _.without(this.phrases, phrase); // Remove the phrase from choice list
			var choices = _.sample(choices, CHOICE_NUM - 1); // Minus one since we will add it later
			choices.push(phrase);
			choices = _.shuffle(choices);

			for (var i = 0; i < choices.length; ++i) {
				choices[i] = _.extend(choices[i], {
					hotkey: i+1, 
					checked: false,
					translation: choices[i].vietnamese,
				});
			}
			Session.set("choices", choices);
			Session.set("qInitialized" + qNumber, true);
		}
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

aMultipleChoices = function(phrase) {
	var userAnswer = _.findWhere(Session.get("choices"), {checked: true});
	console.log(userAnswer);

	return userAnswer.vietnamese === phrase.vietnamese;
}