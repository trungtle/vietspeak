Template.lessonContent.helpers({
	content: function() {

		return 'In this lesson, we will learn how to greet in Vietnamese with the formal way "xin chào", the informal "chào", and asking for names and where people are from. "Người" means people and is added in front of a country name to mean the people from that country.';
		// // Data context is a lesson object
		// var lesson = Lessons.findOne(this._id);
		// return lesson.content;
	},

	showLesson: function() {
		Session.setDefault("showLesson", true);
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