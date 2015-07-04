Template.lessonsList.helpers({
    lessons: function() {
        return Lessons.find();
    },
    count: function() {
        return Lessons.find().count();
    }
});
