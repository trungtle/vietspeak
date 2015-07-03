Template.questionArea.helpers({
	qTypeTemplate: function() {
		switch(this.phrases[Session.get("qNumber")].qType) {
			case QTYPE.TRANSLATE_VE:
				return "qTranslateVE";

			case QTYPE.LISTEN_VE:
				return "qListenVE";

			case QTYPE.TRUE_FALSE:
				return "qTrueFalse";

			case QTYPE.MULTIPLE_CHOICES_TRANSLATION:
			case QTYPE.MULTIPLE_CHOICES_TRANSLATION_PIC:
				return "qMultipleChoicesTranslation";
		}
	}
});
