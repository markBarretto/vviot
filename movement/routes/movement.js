var express = require('express');
var router = express.Router();
var motion = require('../classes/motion.js');

router.get('/', function(req, res, next) {
  res.send(motion);	
  //res.render('index', { title: 'Express' });
});

module.exports = router;
