/**
 * Actions for employment form submission and associated AJAX calls
 *
 * @author antoinette@primeacademy.io
 */

/**
 * Create a JSON representation of application based on serialized data
 *
 * @param serializedArray {array} name-value pairs from a jQuery serialized form
 * @return {string} a JSON string that represents our application
 */
function buildJSON(serializedArray) {
  // Templates for application object that will be sent to server
  var application = {
    'firstName': '',
    'lastName': '',
    'desiredJob': '',
    'location': {
      'type': '',
      'city': '',
      'state': ''
    },
    'skills': [],
    'history': []
  };
  // History array will temporarily store history data
  var history =[[],[],[]];
  // Counter will allow us to determine which inner array we are adding history data to
  var counter = 0;
  // loop over our array of data and add to our object templates
  serializedArray.forEach(function(element, index, array){
    if(element.name == 'firstName') {
      application.firstName = element.value;
      return;
    }
    if(element.name == 'lastName') {
      application.lastName = element.value;
      return;
    }
    if(element.name == 'desiredJob') {
      application.desiredJob = element.value;
      return;
    }
    if(element.name == 'desiredLocation') {
      application.location.type = element.value;
      return;
    }
    if(element.name == 'desiredCity') {
      application.location.city = element.value;
      return;
    }
    if(element.name == 'desiredState') {
      application.location.state = element.value;
      return;
    }
    if(element.name == 'skills') {
      application.skills = element.value.split(',');
      return;
    }
    // employment history entries, collect the data
    if(element.name == 'title') {
        history[counter][0] = element.value;
        return;
    }
    if(element.name == 'employer') {
      history[counter][1] = element.value;
      return;
    }
    if(element.name == 'city') {
      history[counter][2] = element.value;
      return;
    }
    if(element.name == 'state') {
      history[counter][3] = element.value;
      return;
    }
    if(element.name == 'description') {
      history[counter][4] = element.value;
      counter++; // increment this since we've reached last value for a specific history
    }
  });
  // Add histories to application object
  history.forEach(function(element, index, array){
    console.log(element);
    var instance = new History(element[0], element[1], element[2], element[3], element[4]);
    application.history.push(instance);
  });
  return JSON.stringify(application);
}
/**
 * Employment history data.
 * @constructor
 */
function History(title, employer, city, state, description) {
  this.title = title;
  this.employer = employer;
  this.city = city;
  this.state = state;
  this.description = description;
}
/** --------------- Actions that should occur after page load --------------- **/
$(document).on('ready', function(){
  // Application form submission handling
  $('#application').on('submit', function(e) {
    e.preventDefault();
    var data = $(this).serializeArray();
    // place into object formatted for server
    var application = buildJSON(data);
    console.log(application);
    // send it to the server
    $.ajax({
      url: '/applicant',
      method: 'POST',
      data: {application: application},
      dataType: 'json'
    }).done(function(){
      console.log('OK');
    });
  });
});
