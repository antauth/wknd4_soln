var express = require('express');
var router = express.Router();
var applicants = require('../models/applicant.js');

/* GET admin page. */
router.get('/', function(req, res, next) {
  res.render('admin', { title: 'Rando Corp Applicant Admin', incorporation: 'Rando Corporation 4ever' });
});
/* GET applicants based on query data */
router.get('/applicants', function(req, res, next) {
  console.log(req.query);
  // query details if no query parameters received
  var query = {};
  var limit = 5;
  // query details if query parameters are received
  if(Object.keys(req.query).length > 0) {
    limit = 0;
    if(req.query.firstName.trim().length > 0){
     query.firstName = req.query.firstName.trim();
    }
    if(req.query.lastName.trim().length > 0){
      query.lastName = req.query.lastName.trim();
    }
    if(req.query.location.trim().length > 0){
      if(req.query.location != 'Remote'){
        var loc = req.query.location.trim().split(',');
        query.location.city = loc[0];
        query.location.state = loc[1];
      } else {
        query.location.type = 'remote';
      }
    }
    if(req.query.skills.trim().length > 0){
      query.skills = {'$in': [req.query.skills.trim()]};
    }
  }
  var applications = new applicants();
  applications.getApplications(query, limit, function(err, results) {
    if(err) {
      res.sendStatus(404);
    } else {
      res.json(results);
    }
  });
});

module.exports = router;
