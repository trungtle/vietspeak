Template.register.onCreated(function() {
	Session.set("isLogging", false);
});

Template.landingPage.helpers({
	isLogging: function() {
		return Session.get("isLogging");
	}
});

Template.landingPage.events({

})
