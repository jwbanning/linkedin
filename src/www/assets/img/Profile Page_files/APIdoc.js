define(function(require) {

  var Service = require('app/data/Service'),
      LinkedInService = require('app/data/LinkedInService'),
      Parse = require('parse');

  var APIdoc = {
     getPeople: function(description, truckname) {
      // var currentUser = Parse.User.current(),
      //     id = currentUser.id; 
      return Service.makeRequest(true,'/sample');
    },
    getTruckProfile:  function(description, truckname) {
      var currentUser = Parse.User.current(),
          id = currentUser.id; 
      return Service.makeRequest('classes/trucks?where={"userId":"'+id+'"}');
    },
    addTrucks: function(description, truckname) {
      //var array = tags.split(','),
          var currentUser = Parse.User.current(),
          id = currentUser.id; 
      return Service.makeRequest('classes/trucks', {description: 'description', truckname: 'truckname', userId: id}, 'POST');
    },
    setTruckToProfile: function(truckId) {
      return Service.makeRequest('classes/trucks', {truckId: truckId}, 'POST');
    }
  };

  return APIdoc;
});