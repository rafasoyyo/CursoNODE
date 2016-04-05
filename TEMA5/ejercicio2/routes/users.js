var router 		= require('express').Router();
var passport 	= require('passport');
var user 		= require('../model/userModel');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.route('/login')
	.get(function(req, res, next){
		res.render('account', { title: 'Login', user : req.user , flash: req.flash()});
	})
	.post( passport.authenticate('local', { successRedirect: '/',
                                   			failureRedirect: '/users/login',
                                   			failureFlash: true })
		, 
			function(req, res, next){
				res.redirect('../');
			}
	)


router.route('/register')
	.get(function(req, res, next){
		res.render('account', { title: 'Register' ,user : req.user });
	})
	.post( function(req, res, next){
		user.register(new user({ username : req.body.username }), req.body.password, function(err, account) {
				if (err) {
					console.log (err);
					return res.render('account', { title: 'Register', error : err, user: req.user });
				}
				passport.authenticate('local')(req, res, function () {
					res.redirect('../');
				})
		})
	})
	
router.route('/logout')
	.all(function(req, res, next){
  		req.logout();
		res.render('account', { title: 'Login', user: req.user });
	})

module.exports = router;
