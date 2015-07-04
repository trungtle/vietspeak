Template.lessonContent.onCreated(function() {

    // Initialize to the first question in the lesson
    Session.set("lPage", 0); // lesson page

});

Template.lessonContent.helpers({
    content: function() {
        return this.content[Session.get("lPage")];
    },
    page: function() {
        return Session.get("lPage") + 1;
    },
    pageTotal: function() {
        return this.content.length;
    },
    showChallenge: function() {
        return Session.get("showChallenge");
    },
    showChallengeButton: function() {
        return Session.equals("lPage", this.content.length - 1);
    },
    isFirstPage: function() {
        return Session.equals("lPage", 0);
    },
    isLastPage: function() {
        return Session.equals("lPage", this.content.length - 1);
    }

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
    },
    "click .practice-button": function() {
        Session.set("showChallenge", true);
    }
});
