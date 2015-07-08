
// --------------
// Publications
// --------------

Meteor.publish("user", function(){
    return Meteor.users.find({_id: this.userId}, {fields: {'profile': 1}});
});

// --------------
// Accounts
// --------------

Accounts.onCreateUser(resetUser);

function resetUser(options, user) {
    if (user.profile == undefined) {
    	user.profile = {};
    }

    if (options.profile) {
    	user.profile = options.profile;
    }

    user.profile['level'] = 1;
    user.profile['dayStreak'] = 0;
    user.profile['completedLessons'] = [];
    return user;
}

