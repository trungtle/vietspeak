Template.lessonsList.helpers({
    lessons: function() {
        var lessons = Lessons.find().fetch();
        console.log(Meteor.user());
        var completedLessons = Meteor.user().profile.completedLessons;
        _.each(lessons, function(lesson) {
        	lesson.completed = _.contains(completedLessons, lesson.name);
	    });

        return lessons;
    },
    count: function() {
        return Lessons.find().count();
    },
});
