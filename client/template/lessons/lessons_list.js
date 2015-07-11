Template.lessonsList.helpers({
    lessons: function() {
        var lessons = Lessons.find().fetch();
        var profile = Meteor.user().profile;
        var completedLessons = profile.completedLessons;
        var unlockedLessons = profile.unlockedLessons;
        _.each(lessons, function(lesson) {
        	lesson.completed = _.contains(completedLessons, lesson.name);
            lesson.unlocked = _.contains(unlockedLessons, lesson.name);
	    });

        return lessons;
    },
    count: function() {
        return Lessons.find().count();
    },
});
