var mongoose = require('mongoose');
// var passportLocalMongoose = require('passport-local-mongoose');

var user_schema = new mongoose.Schema({
										username: String,
										password: String
									});

// user_schema.plugin(passportLocalMongoose);

user = mongoose.model('user', user_schema);
module.exports = user;

// route middleware to make sure a user is logged in
user.isLoggedIn = function(req, res, next) {
    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated()){
        return next();
    }
    // if they aren't redirect them to the home page
    res.redirect('/users/login');
}