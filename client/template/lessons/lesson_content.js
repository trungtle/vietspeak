Template.lessonContent.onCreated(function() {

	// Initialize to the first question in the lesson
	Session.set("lPage", 0); // lesson page

});

Template.lessonContent.helpers({
	content: function() {
		return this.content[Session.get("lPage")];
	},

});

Template.lessonContent.events({
	"click .back": function() {
		var page = Session.get("lPage");
		if (page > 0) {
			page--;
		}
		Session.set("lPage", page);
	},
	"click .next": function() {
		var page = Session.get("lPage");
		if (page + 1 < this.content.length) {
			page++;
		}
		Session.set("lPage", page);
	}
});
