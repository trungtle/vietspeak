Template.questionArea.helpers({
	qTypeTemplate: function() {
		switch(this.phrases[Session.get("qNumber")].qType) {
			case QTYPE.TRANSLATE_VE:
				return "qTranslateVE";

			case QTYPE.LISTEN_VE:
				return "qListenVE";

			case QTYPE.MULTIPLE_CHOICES:
			case QTYPE.MULTIPLE_CHOICES_PIC_VE:
				return "qMultipleChoices";
		}
	}
});
