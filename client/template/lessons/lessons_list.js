Template.lessonsList.helpers({
    lessons: function(level) {
        return lessonsAtLevel(level);
    },
    count: function() {
        return Lessons.find().count();
    },
    levels: function() {
        var highestLevel = 10;
        var levels = [];
        for (var i = 1; i <= highestLevel; i++) {
            var count = Lessons.find({level:i}).count();
            console.log(count);
            levels.push({level: i, number: count, evenRow: i % 2 == 0});
        }
        return levels;
    }
});

function lessonsAtLevel(level)
{
    var lessons = Lessons.find({level: level}).fetch();
    var profile = Meteor.user().profile;
    var unlockedLessons = profile.unlockedLessons;
    _.each(lessons, function(lesson) {
        lesson.unlocked = _.contains(_.keys(unlockedLessons), lesson.name);
        if (lesson.unlocked) {
            lesson.completed = unlockedLessons[lesson.name].percentCompleted === 100;
        }
    });

    return lessons;
}
