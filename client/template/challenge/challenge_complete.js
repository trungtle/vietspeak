Template.challengeComplete.helpers({
	reachedNewLevel: function() {
		return Session.get("reachedNewLevel");
	},

	xpGained: function() {
		return Session.get("xpGained");
	}
});

Template.challengeComplete.events({
    "click #try-again-button": function() {
        resetChallenge();
    },
});
