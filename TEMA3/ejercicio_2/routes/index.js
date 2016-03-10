var express = require('express');
var router = express.Router();
var data = require('../controllers/Data');

/* GET home page. */
router.get('/', function(req, res, next) {
  	res.render('index', { 
  							title: 'Express',
							nombres : data.getNames()
	});
});

module.exports = router;
