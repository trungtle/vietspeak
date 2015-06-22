Template.qTranslateVE.rendered = function() {
    if(!this._rendered) {      	
      	this._rendered = true;
      
		// Focus answer box
		$('#answer-text').focus();

    }
}

Template.qTranslateVE.helpers({
	audioSrc: function() {
		var phrase = this.phrases[Session.get("qNumber")];
		return phrase.audioSrc;
	},
	vietnamese: function() {
		var phrase = this.phrases[Session.get("qNumber")];
		return phrase.vietnamese;
	}
});

Template.qTranslateVE.events({
	"keyup #answer-text": function(ev) {
		if (ev.target.value.length) {
			enableSubmitButton();
		}
	},
	"click .play-audio": function(ev) {
		Session.setDefault("audio", new Audio(Session.get("phrase").audioSrc));
		var audio = Session.get("audio");
		audio.play();
	}
});

aTranslateVE = function(phrase) {
	
	// Check answer text against the translation list
	var answer = $('#answer-text').val().trim().toLowerCase();
	var translationList = phrase["english"];

	return _.some(translationList, function(english) {
		return answer === english.toLowerCase();
	});
}

