Template.lessonsList.onRendered(function() {
    newBackground("img/april.jpg");
});

Template.lessonsList.helpers({
    lessons: function(level) {
        return lessonsAtLevel(level);
    },
    count: function() {
        return Lessons.find().count();
    },
    levels: function() {
        // Return the levels attributes
        var highestLevel = 10;
        var levels = [];
        for (var i = 1; i <= highestLevel; i++) {
            var lessonsPerLevel = Lessons.find({level:i}).count();
            levels.push({
                level: i,
                lessonsPerLevel: lessonsPerLevel,
                evenRow: i % 2 == 0,
                xpRequired: LEVEL_XP_REQUIREMENTS[i]
            });
        }
        return levels;
    }
});

function lessonsAtLevel(level)
{
    var lessons = Lessons.find({level: level}, {sort: {index: 1}}).fetch();
    var profile = Meteor.user().profile;
    var unlockedLessons = profile.unlockedLessons;
    _.each(lessons, function(lesson) {
        lesson.unlocked = _.contains(_.keys(unlockedLessons), lesson.name);
        lesson.level = level;
        lesson.xpRequired = LEVEL_XP_REQUIREMENTS[level];
        if (lesson.unlocked) {
            lesson.completed = unlockedLessons[lesson.name].percentCompleted === 100;
        }
    });

    return lessons;
}
