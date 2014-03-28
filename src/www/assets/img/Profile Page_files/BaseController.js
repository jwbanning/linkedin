define(function(require) {

  var Controller = require('lavaca/mvc/Controller');
  var merge = require('mout/object/merge');
  var Promise = require('lavaca/util/Promise');
  var stateModel = require('app/models/StateModel');

  /**
   * Base controller
   * @class app.net.BaseController
   * @extends Lavaca.mvc.Controller
   */
  var BaseController = Controller.extend(function(){
      Controller.apply(this, arguments);
    }, {
    updateState: function(historyState, title, url, stateProps){
      var defaultStateProps = {pageTitle: title};
      this.history(historyState, title, url)();

      stateProps = merge(stateProps || {}, defaultStateProps);
      stateModel.apply(stateProps, true);
      stateModel.trigger('change');
    },
    exec: function(action, params) {
      // this.isauth().then(function(promise) {
      //   debugger;
      // }.bind(this));
      var isAuthorized = Parse.User.current();
      var redirect;
      if (params.needsAuthentication && isAuthorized === null) {
        redirect = '/';        
      }
      if (redirect) {
        return this.redirect(redirect);
      } else {
        return Controller.prototype.exec.apply(this, arguments);
      }
    },
    isauth:function() {
      var promise = new Promise();
      IN.User.authorize(function(){
        promise.resolve();
        
      }.bind(this));

      return promise
    }
  });

  return BaseController;

});