// maybe we should have a single file contain our constants
const KEYCODE_ENTER = 13;

Template.qRearrange.rendered = function() {

    // Focus answer box
    $('#answer-text').focus();
}

Template.qRearrange.onCreated(function() {

    // Play sound when first created
    var lesson = Template.currentData();
    var phrase = lesson.phrases[Session.get("phraseIndex")];
    var audio = new Audio(phrase.audioSrc);
    audio.play();
});

Template.qRearrange.helpers({
    audioSrc: function() {
        var phrase = this.phrases[Session.get("phraseIndex")];
        return phrase.audioSrc;
    },
    vietnamese: function() {
        var phrase = this.phrases[Session.get("phraseIndex")];
        var vietnamese = phrase.vietnamese;
        return vietnamese;
    },
    isListeningOnly: function() {
        var phrase = this.phrases[Session.get("phraseIndex")];
        return phrase.qType === QTYPE.LISTEN_VE;
    }
});

Template.qRearrange.events({
    "keyup #answer-text": function(ev) {
        if (ev.target.value.length && ev.keyCode !== KEYCODE_ENTER) {
            enableSubmitButton();
        }
    },
    "click .play-audio": function(ev) {
        var phrase = this.phrases[Session.get("phraseIndex")];
        var audio = new Audio(phrase.audioSrc);
        audio.play();
    }
});
