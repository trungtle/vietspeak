Template.lessonPage.onRendered(function() {
	newBackground("/img/july.jpg");
});

Template.lessonPage.onCreated(function() {
    Session.set("showChallenge", true);
    Session.set("showChallengeButton", true);
});

Template.lessonPage.helpers({
    showChallenge: function() {
        return Session.get("showChallenge");
    }
});

Template.lessonPage.events({});
