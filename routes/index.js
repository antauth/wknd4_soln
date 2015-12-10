var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Rando Careers', incorporation: 'Rando Corporation 4ever' });
});

module.exports = router;
