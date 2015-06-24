Template.qTranslateVE.rendered = function() {

    // Focus answer box
    $('#answer-text').focus();
}

Template.qTranslateVE.onCreated = function () {

    // Play sound when first created
    var lesson = Template.currentData();
    var phrase = lesson.phrases[Session.get("qNumber")];
    var audio = new Audio(phrase.audioSrc);
    audio.play();
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
        var phrase = this.phrases[Session.get("qNumber")];
        var audio = new Audio(phrase.audioSrc);
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

