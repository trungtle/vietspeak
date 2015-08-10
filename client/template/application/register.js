Template.register.onCreated(function() {
    Session.set("error", false);
    Session.set("errorMessage", "");
});

Template.register.events({
	"submit form": function(event) {
		event.preventDefault();
        var name = event.target.registerName.value;
        var email = trimInput(event.target.registerEmail.value.toLowerCase());
        var password = event.target.registerPassword.value;
        var confirmPassword = event.target.registerConfirmPassword.value;

        if (isNotEmpty(email, errorAlert) &&
            isNotEmpty(password, errorAlert) &&
            isEmail(email, errorAlert) &&
            areValidPasswords(password, confirmPassword, errorAlert)) {

            Accounts.createUser({
                username: name,
                email: email,
                password: password,
            }, function(err) {
                if (err) {
                    errorAlert(err.reason);
                }
            });
        }
        return false;

	},

	"click #login-link": function() {
		Session.set("isLogging", true);
	},
});

