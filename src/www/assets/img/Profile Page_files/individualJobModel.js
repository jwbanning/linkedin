define(function(require) {

  var Model = require('lavaca/mvc/Model'),
      Promise = require('lavaca/util/Promise');

  var individualJobModel = Model.extend(function individualJobModel() {
    Model.apply(this, arguments);
  
  },{
   
  });


  return individualJobModel;
});
