Template.questionArea.helpers({
	qTypeTemplate: function() {
		switch(Session.get("qType")) {
			case QTYPE.TRANSLATE_VE:
				return "qTranslateVE";

			case QTYPE.LISTEN_VE:
				return "qListenVE";

			case QTYPE.MULTIPLE_CHOICES:
				return "qMultipleChoices";
		}
	}
});