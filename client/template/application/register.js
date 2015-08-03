Template.register.events({
	"submit form": function(event) {
		event.preventDefault();
        var name = event.target.registerName.value;
        var email = event.target.registerEmail.value;
        var password = event.target.registerPassword.value;
        var confirmPassword = event.target.registerConfirmPassword.value;

        Accounts.createUser({
        	username: name,
   			email: email,
    		password: password,
    		profile: {
    			country: "Vietnam"
    		}
		});
	},

	"click #login-link": function() {
		Session.set("isLogging", true);
	},
});

trimInput = function(value) {
    return value.replace(/^\s*|\s*$/g, '');
};

isNotEmpty = function(value) {
    if (value && value !== ''){
        return true;
    }
    console.log('Please fill in all required fields.');
    return false;
};

isEmail = function(value) {
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (filter.test(value)) {
        return true;
    }
    console.log('Please enter a valid email address.');
    return false;
};

isValidPassword = function(password) {
    if (password.length < 6) {
        console.log('Your password should be 6 characters or longer.');
        return false;
    }
    return true;
};

areValidPasswords = function(password, confirm) {
    if (!isValidPassword(password)) {
        return false;
    }
    if (password !== confirm) {
        console.log('Your two passwords are not equivalent.');
        return false;
    }
    return true;
};
