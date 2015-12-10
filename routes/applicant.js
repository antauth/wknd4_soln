/**
 * Applicant route.
 *
 * @author antoinette@primeacademy.io
 */
var express = require('express');
var router = express.Router();
var applicant = require('../models/applicant');

router.post('/', function(req, res, next) {
  var application = new applicant();
  application.saveApplication(JSON.parse(req.body.application), function(err, result) {
    if(err){
      res.status(400).send({message: 'Cannot save application'});
    } else {
      res.sendStatus(201);
    }
  });
});

module.exports = router;
