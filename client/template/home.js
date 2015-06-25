Template.home.helpers({
	login: function() {
		// @todo: Default to always logged in
		return true;

		if (Meteor.userId()) {
			return true;
		} else {
			return false;
		}
	},

	username: function() {
		return Meteor.user().username;
	}
});
