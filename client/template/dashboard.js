Template.dashboard.onCreated(function() {
	var user = Meteor.user();

});

Template.dashboard.helpers({
    username: function() {
        return Meteor.user().username;
    },

    dayStreak: function() {
    	var user = Meteor.user();
    	return user.dayStreak;
    }
});
