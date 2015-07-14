Meteor.subscribe("user");

Template.dashboard.onCreated(function() {

});

Template.dashboard.helpers({
    dayStreakUnit: function() {
    	var dayStreak = Meteor.user().profile.dayStreak;
        if (dayStreak <= 1) {
            return "day streak"
        } else {
            return "days streak"
        }
    },
});
