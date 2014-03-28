define(function(require) {

  var HomeView = require('app/ui/views/HomeView'),
      BaseController = require('app/net/BaseController'),

      ProfileView = require('app/ui/views/ProfileView'),
      UserProfileModel = require('app/models/UserProfileModel'),
      Model = require('lavaca/mvc/Model');
      require('linkedin');

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
    index: function(params, model) {
      IN.init({api_key:'75z0p2vu0za6st', authorize:true, onLoad:this.myOnloadFunction()});
      var model = new Model();
      return this
        .view(null, HomeView, model)
        .then(this.updateState(history, 'LinkedIn Statistics', params.url));
    },
    myOnloadFunction: function() {
      IN.Event.on(IN, "auth", this.onLinkedInAuth);
      //alert('called linkedinload');
    },
    onLinkedInAuth: function() {
      //alert('called AUTH');
    },
    
    profile: function(params, model) {

      // IN.API.Profile("me").fields('id','skills','educations','first-name', 'last-name', 'headline', 'location:(name)','distance','summary','specialties','positions', 'picture-url','num-recommenders').result(function(result) {
      //   // console.log(JSON.stringify(result));
      //   console.log(result);
      // });


      var model = new UserProfileModel();
      return this
        .view(null, ProfileView, model)
        .then(this.updateState(history, 'LinkedIn Profile', params.url));
    }
  });

  return HomeController;

});
