var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('/Testing.html' , { root : __dirname});
});
router.get('/testing.css', function(req, res, next) {
	res.sendFile('/testing.css' , { root : __dirname});
});
router.get('/example3.js', function(req, res, next) {
	res.sendFile('/example3.js' , { root : __dirname});
});


module.exports = router;
