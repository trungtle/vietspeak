Template.lessonPage.onCreated(function() {
	Session.set("showChallenge", false);
	Session.set("showChallengeButton", true);
});

Template.lessonPage.helpers({
	showChallenge: function() {
		return Session.get("showChallenge");
	}
});

Template.lessonPage.events({
});
