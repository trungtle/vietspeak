Template.login.onCreated(function() {
    Session.set("error", false);
    Session.set("errorMessage", "");
});

Template.login.events({
    'submit form': function(event) {
        event.preventDefault();
        var emailOrName = trimInput(event.target.loginEmailOrName.value);
        var password = event.target.loginPassword.value;

    	if (isNotEmpty(emailOrName, errorAlert) &&
            isNotEmpty(password, errorAlert) &&
            isValidPassword(password, errorAlert)) {

      		Meteor.loginWithPassword(
                emailOrName,
                password,
      			function(err) {
	        		if (err) {
	          			errorAlert(err.reason);
	        		}
      		});
    	}
    	return false;
    },

    'click #signup-link': function(event) {
    	Session.set("isLogging", false);
    }
});
