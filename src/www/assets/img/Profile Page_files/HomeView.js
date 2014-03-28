define(function(require) {

  var BaseView = require('./BaseView'),
  $ = require('$'),
  APIdoc = require('app/data/APIdoc');
  require('rdust!templates/home');
  //var linkedin = require('linkedin');

  /**
   * Example view type
   * @class app.ui.views.HomeView
   * @extends app.ui.views.BaseView
   */
  var HomeView = BaseView.extend(function HomeView() {
    BaseView.apply(this, arguments);
    this.mapEvent({
      'h1':{
        tap: this.submit.bind(this)
      }
    });
  },{

    template: 'templates/home',
    className: 'home',

    onRenderSuccess: function() {
      BaseView.prototype.onRenderSuccess.apply(this, arguments);
    },
    submit: function(e) {
      IN.API.Profile("me").fields('id','skills','educations','first-name', 'last-name', 'headline', 'location:(name)','distance','summary','specialties','positions', 'picture-url','num-recommenders').result(function(result) {
      console.log(JSON.stringify(result)) 
    });
    }


  });

  return HomeView;

});
