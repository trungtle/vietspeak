Template.lessonsList.helpers({
    lessons: function() {
        var lessons = Lessons.find().fetch();
        var profile = Meteor.user().profile;
        var unlockedLessons = profile.unlockedLessons;
        _.each(lessons, function(lesson) {
            lesson.unlocked = _.contains(_.keys(unlockedLessons), lesson.name);
        	if (lesson.unlocked) {
                lesson.completed = unlockedLessons[lesson.name].percentCompleted === 100;
            }
	    });

        return lessons;
    },
    count: function() {
        return Lessons.find().count();
    },
});
