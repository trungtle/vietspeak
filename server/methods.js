Meteor.methods({
	unlockLevel: function(userId, level) {
		if (userId !== Meteor.userId()) {
			throw new Meteor.Error("not-authorize");
		}
	    var user = Meteor.user();
	    unlockLevel(user, parseInt(level));
	}
});

