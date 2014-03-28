define(function(require) {
  var Collection = require('lavaca/mvc/Collection'),
      debounce = require('mout/function/debounce'),
      individualJobModel = require('app/models/individualJobModel'),
      stateModel = require('app/models/StateModel');

  var JobCollection = Collection.extend(function JobCollection() {
    Collection.apply(this, arguments);

  }, {
      TModel: individualJobModel,

      search:function() {
        IN.API.Raw("/people/~/suggestions/job-suggestions").result( function(me) {
          console.log(me.jobs.values[0])
        }.bind(this));
      }
  });

   // Computed properties


 return JobCollection;
});