Template.lessonContent.helpers({
	content: function() {
		var lesson = Lessons.findOne(this._id);
		return lesson.content;
	},

	showLesson: function() {
		return Session.get("showLesson");
	}

});

Template.lessonContent.events({
	"click #view-lesson": function()
	{
		Session.set("showLesson", !Session.get("showLesson"));
	},
	"click .back": function() {

	}
});
