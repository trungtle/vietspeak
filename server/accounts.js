// --------------
// Publications
// --------------

Meteor.publish("user", function() {
    return Meteor.users.find({
        _id: this.userId
    }, {
        fields: {
            'profile': 1
        }
    });
});

// --------------
// Accounts
// --------------

// By default, create an admin account

Meteor.users.remove({
    username: 'admin'
});

Accounts.onCreateUser(resetUser);

if (Meteor.users.find().count() === 0) {

    Accounts.createUser({
        username: 'admin',
        password: 'password'
    });
}

function resetUser(options, user) {
    if (user.profile == undefined) {
        user.profile = {};
    }

    if (options.profile) {
        user.profile = options.profile;
    }

    user.profile['unlockedLessons'] = {};
    user.profile['level'] = 1;
    unlockLevel(user, user.profile['level']);
    user.profile['dayStreak'] = 0;
    user.profile['xp'] = 0;
    user.profile['timeLastChallengeCompleted'] = 0;
    return user;
}

// --------------
// Unlock lessons
// --------------

unlockLevel = function(user, level) {
    var lessons = Lessons.find({level: level}).fetch();
    for (var i = 0; i < lessons.length; i++) {
        unlockLesson(user, lessons[i].name);
    }

    Meteor.users.update(user._id, {$set: { "profile.level": level}});
}

unlockLesson = function(user, lessonName) {
    var unlockedLessons = user.profile.unlockedLessons;
    unlockedLessons[lessonName] = {
        timestamp: new Date(),
        percentCompleted: 0
    };

    Meteor.users.update(user._id, {$set: { "profile.unlockedLessons": unlockedLessons}});
}

// --------------
// Daystreak
// --------------

const MILLISECONDS_PER_DAY = 86400000;

function checkDayStreak() {
    var users = Meteor.users.find().fetch();
    var now = new Date().getTime();

    _.each(users, function(user) {

        // Reset day streak if user hasn't practice within the last day
        if (now - user.profile.timeLastChallengeCompleted >= MILLISECONDS_PER_DAY) {
            Meteor.users.update(user._id, {$set: {"profile.dayStreak": 0}})
        }
    });
}

var cron = new Meteor.Cron( {
      events:{
        "0 0 * * *"  : checkDayStreak,
      }
    });
