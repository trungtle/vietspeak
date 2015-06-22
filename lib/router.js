Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
});

Router.route('/', {name: 'lessonsList'});
Router.route('/lessons/:_id', {
	name: 'lessonPage',
	data: function() { return Lessons.findOne(this.params._id); }
});
Router.onBeforeAction('dataNotFound', {only: 'lessonPage'});