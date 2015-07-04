Template.header.helpers({
    login: function() {
        // @todo: default to always logged in
        return true;

        if (Meteor.userId()) {
            return true;
        }
        else {
            return false;
        }
    }
});
