Template.challengeProgress.helpers({
    percent: function() {
        return Session.get("challengeProgress");
    }
});
