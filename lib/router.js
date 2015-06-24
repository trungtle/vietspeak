Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
});

Router.route('/', {
	name: "introPage"
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

// var OnBeforeActions;

// OnBeforeActions = {
//     loginRequired: function(pause) {
// 		if (!Meteor.userId()) {
// 			this.render('login');
// 			return pause();
// 		}
//     }
// };

// Router.onBeforeAction(OnBeforeActions.loginRequired, {
//     only: ['settings', 'lessonPage', 'lessonsList']
// });
