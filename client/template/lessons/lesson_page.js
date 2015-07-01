Template.lessonPage.onCreated(function() {
	Session.set("showChallenge", false);
});

Template.lessonPage.helpers({
	showChallenge: function() {
		return Session.get("showChallenge");
	}
});

Template.lessonPage.events({
});
