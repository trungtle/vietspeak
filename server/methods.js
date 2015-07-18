Meteor.methods({
	unlockLevel: function(userId, level) {
		if (userId !== Meteor.userId()) {
			throw new Meteor.Error("not-authorize");
		}
		console.log("unlock level" + level);
	    var user = Meteor.user();
	    unlockLevel(user, level);
	}
});

