Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
});

Router.route('/', {name: 'lessonsList'});
Router.route('/lessons/:_id', {
	name: 'lessonPage',
	data: function() {
		var lessonId = this.params._id;
		return Lessons.findOne(lessonId);
	},
});
Router.onBeforeAction('dataNotFound', {only: 'lessonPage'});
