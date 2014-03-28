define(function(require) {

  var HomeView = require('app/ui/views/HomeView'),
      Parse = require('parse'),
      BaseController = require('app/net/BaseController'),
      UserProfileModel = require('app/models/UserProfileModel'),
      ProfileView = require('app/ui/views/ProfileView'),
      router = require('lavaca/mvc/Router'),
      JobCollection = require('app/models/JobCollection'),
      JobsView = require('app/ui/views/JobsView'),
      MatchCollection = require('app/models/MatchCollection'),
      MatchView = require('app/ui/views/MatchView'),
      Model = require('lavaca/mvc/Model');

  /**
   * Home controller
   * @class app.net.HomeController
   * @extends app.net.BaseController
   */
  var HomeController = BaseController.extend({
    /**
     * Home action, creates a history state and shows a view
     * @method home
     *
     * @param {Object} params  Action arguments
     * @param {Object} history  History state model
     * @return {Lavaca.util.Promise}  A promise
     */
    index: function(params, history) {
      console.log(window.location.href);

      var model = new Model();
      return this
        .view(null, HomeView, model)
        .then(this.updateState(history, 'Home Page', params.url));
    },
    profile: function(params, model) {
      if (!model) {
        model = {};
      }
      return this
        .view(null, ProfileView, new UserProfileModel())
        .then(this.updateState(model, 'Profile Page', params.url));
    },
    jobs: function(params, model) {
      if (!model) {
        model = {};
      }
      return this
        .view(null, JobsView, new JobCollection())
        .then(this.updateState(model, 'Profile Page', params.url));
    },
    match: function(params, model) {
      if (!model) {
        model = {};
      }
      return this
        .view(null, MatchView, new MatchCollection())
        .then(this.updateState(model, 'Profile Page', params.url));
    }
  });

  return HomeController;

});
