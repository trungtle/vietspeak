Template.qListenVE.rendered = function() {

	// Focus answer box
	$('#answer-text').focus();
}

Template.qListenVE.onCreated(function () {

	// Play sound the when the temmplate is created
    var lesson = Template.currentData();
    var phrase = lesson.phrases[Session.get("qNumber")];
    var audio = new Audio(phrase.audioSrc);
    audio.play();
});

Template.qListenVE.helpers({
	audioSrc: function() {
		var phrase = this.phrases[Session.get("qNumber")];
		return phrase.audioSrc;
	},
});

Template.qListenVE.events({
	"keyup #answer-text": function(ev) {
		if (ev.target.value.length) {
			enableSubmitButton();
		}
	},
	"click .play-audio": function(ev) {
		var phrase = this.phrases[Session.get("qNumber")];
		var audio = new Audio(phrase.audioSrc);
		audio.play();
	}
});

