Template.qTranslateVE.rendered = function() {

    // Focus answer box
    $('#answer-text').focus();
}

Template.qTranslateVE.helpers({
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

Template.qTranslateVE.events({
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

aTranslateVE = function(phrase) {

    // Check answer text against the translation list
    var answer = $('#answer-text').val().trim().toLowerCase();
    var translationList = phrase["english"];

    Session.set("feedback", phrase.english[0]);
    var answerCorrect = _.some(translationList, function(english) {
        return answer === english.toLowerCase();
    });

    return answerCorrect? CHALLENGE_PROGRESS_CORRECT : CHALLENGE_PROGRESS_WRONG;
}

setupTranslate = function(lesson) {

    // Play sound when first created
    var lesson = Template.currentData();
    var phrase = lesson.phrases[Session.get("phraseIndex")];
    var audio = new Audio(phrase.audioSrc);
    audio.play();

    if($('#answer-text')[0] !== undefined) {
        $('#answer-text')[0].value = "";
    }
}
