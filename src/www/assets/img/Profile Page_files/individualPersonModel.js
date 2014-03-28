define(function(require) {

  var Model = require('lavaca/mvc/Model'),
      Promise = require('lavaca/util/Promise');

  var individualPersonModel = Model.extend(function individualPersonModel() {
    Model.apply(this, arguments);
  
  },{
    search:function() {
      }
  });


  return individualPersonModel;
});
