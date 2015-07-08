Meteor.subscribe("user");

Template.dashboard.onCreated(function() {

});

Template.dashboard.helpers({
    username: function() {
        return Meteor.user().username;
    },

    dayStreak: function() {
    	var dayStreak = Meteor.user().profile.dayStreak;
        if (dayStreak <= 1) {
            return dayStreak + " day streak"
        } else {
            return dayStreak + " days streak"
        }
    },

    level: function() {
    	return Meteor.user().profile.level;
    }
});
