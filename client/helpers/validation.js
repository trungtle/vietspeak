trimInput = function(value) {
    return value.replace(/^\s*|\s*$/g, '');
};

isNotEmpty = function(value, callback) {
    if (value && value !== ''){
        return true;
    }
    callback('Please fill in all required fields.');
    return false;
};

isEmail = function(value, callback) {
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (filter.test(value)) {
        return true;
    }
    callback('Please enter a valid email address.');
    return false;
};

isValidPassword = function(password, callback) {
    if (password.length < 6) {
        callback('Your password should be 6 characters or longer.');
        return false;
    }
    return true;
};

areValidPasswords = function(password, confirm, callback) {
    if (!isValidPassword(password)) {
        return false;
    }
    if (password !== confirm) {
        callback('Your two passwords are not equivalent.');
        return false;
    }
    return true;
};
