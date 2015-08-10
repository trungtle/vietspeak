Meteor.subscribe("user");

Template.dashboard.onRendered(function() {
    newBackground("img/march.jpg");
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
