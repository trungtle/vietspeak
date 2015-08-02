// -----------
// Configure
// -----------
Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
});

// -----------
// Route mapping
// -----------
Router.route('landingPage');
Router.route('dashboard');
Router.route('/', {
    name: "index",
});

Router.route('/lessons', {
    name: "lessonsList",
});

Router.route('/lessons/:_id', {
    name: 'lessonPage',
    data: function() {
        var lessonId = this.params._id;
        return Lessons.findOne(lessonId);
    },
});

// -----------
// On before hooks
// -----------

var mustBeSignedIn = function(pause) {
    if (!(Meteor.user() || Meteor.loggingIn())) {
        Router.go('landingPage');
    } else {
        this.next();
    }
};

var goToDashboard = function(pause) {
    if (Meteor.user()) {
        Router.go('dashboard');
    } else {
        this.next();
    }
};

Router.onBeforeAction(mustBeSignedIn, {
    except: ['landingPage']
});
Router.onBeforeAction(goToDashboard, {
    only: ['index', 'landingPage']
});

