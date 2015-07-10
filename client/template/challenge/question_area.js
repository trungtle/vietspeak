Template.questionArea.helpers({
    qTypeTemplate: function() {
        switch (this.phrases[Session.get("phraseIndex")].qType) {
            case QTYPE.TRANSLATE_VE:
            case QTYPE.LISTEN_VE:
                return "qTranslateVE";

            case QTYPE.TRUE_FALSE:
                return "qTrueFalse";

            case QTYPE.MULTIPLE_CHOICES_TRANSLATION:
            case QTYPE.MULTIPLE_CHOICES_TRANSLATION_PIC:
                return "qMultipleChoicesTranslation";
            case QTYPE.WORD_PAIRING:
                return "qWordPairing";
            default:
                return "qTrueFalse";
        }
    }
});
