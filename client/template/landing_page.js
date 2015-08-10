Template.landingPage.onRendered(function() {
    newBackground("img/march.jpg");
});

Template.landingPage.onCreated(function() {
	Session.set("isLogging", false);
});

Template.landingPage.helpers({
	isLogging: function() {
		return Session.get("isLogging");
	},
    error: function() {
        return Session.get("error");
    },
    errorMessage: function() {
        return Session.get("errorMessage");
    }
});

errorAlert = function(message) {
    Session.set("error", true);
    Session.set("errorMessage", message);
}
