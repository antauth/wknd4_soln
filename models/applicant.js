/**
 * Manage applicant data.
 *
 * @author antoinette@primeacademy.io
 */
var mongoClient = require('mongodb').MongoClient;
// Define our constants here so we can easily update them
var DB_CONNECT = 'mongodb://localhost:27017/rando';

/**
 * Applicant data.
 * @param {string} firstName
 * @param {string} lastName
 * @param {string} desiredJob
 * @param {string} location
 * @param {array} history
 * @param {array} skills
 * @constructor
 */
function Applicant(firstName, lastName, desiredJob, location, history, skills) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.desiredJob = desiredJob;
  this.location = location;
  this.history = history;
  this.skills = skills;

  /**
   * Add an application to the database.
   *
   * @param applicant {object} an applicant object
   * @param callback {function} your callback
   */
  this.saveApplication = function(applicant, callback) {
    mongoClient.connect(DB_CONNECT, function(err, db) {
      var applications = db.collection('applications');
      applications.insertOne(applicant, {w: 1}, function(err, result) {
        return callback(err, result);
      });
    });
  }
  /**
   * Get applications from database.
   *
   * @param query {string} a query string
   * @param limit {number} number of records to return
   * @param callback {function} your callback
   */
  this.getApplications = function(query, limit, callback) {
    var limitNum = limit ? limit : 0; // ternary operator sets limitNum to 0 if limit not set
    mongoClient.connect(DB_CONNECT, function(err, db) {
      var applications = db.collection('applications');
      applications.find(query).limit(limitNum).toArray(function(err, results) {
        return callback(err, results);
      });
    });
  }
}

module.exports = Applicant;