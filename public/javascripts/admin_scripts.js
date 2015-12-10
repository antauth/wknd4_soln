/**
 * Actions for admin page and associated AJAX calls
 *
 * @author antoinette@primeacademy.io
 */
/** --------------- Actions that should occur after page load --------------- **/
$(document).on('ready', function(){
  /** ------------ Only load template if it is on page ------------- **/
  if($('#list').length){
    var listTemplate = Handlebars.compile($('#list').html());
    // On initial page load, display first 5 applications
    $.ajax({
      url: '/admin/applicants'
    }).done(function (data) {
      renderList(data);
    });

    $('#search').on('submit', function(e) {
      e.preventDefault();
      var data = $(this).serializeArray();
      // send it to the server
      $.ajax({
        url: '/admin/applicants',
        data: data,
        dataType: 'json'
      }).done(function(data){
        renderList(data);
      });
    });

    /** --------------- RENDER FUNCTIONS --------------- **/
    function renderList(array) {
      var compiledHtml = listTemplate({applicants: transformData(array)});
      $('.listing').html(compiledHtml);
    }
  }
});
/**
 * Transforms data received from server into format expected in template
 * @param array Array of data received from server
 * @returns {array} Array of data formatted for template
 */
function transformData(array) {
  array.forEach(function(element, index, array){
    if(element.location.type == 'remote') {
      element.desiredLocation = 'Remote';
    } else {
      element.desiredLocation = element.location.city +', ' + element.location.state;
    }
    element.employer = element.history[0].employer;
  });
  return array;
}
