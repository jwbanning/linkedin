define(function(require) {

  var BaseView = require('./BaseView'),
      router = require('lavaca/mvc/Router');

  require('rdust!templates/home');

  /**
   * Example view type
   * @class app.ui.views.HomeView
   * @extends app.ui.views.BaseView
   */
  var HomeView = BaseView.extend(function HomeView() {
    BaseView.apply(this, arguments);
    this.mapEvent({
      '.take-a-tour':{
        tap: this.submit.bind(this)
      }
    });
  },{
    /**
     * The name of the template used by the view
     * @property {String} template
     * @default 'home'
     */
    template: 'templates/home',
    classname: 'home',
    /**
     * A class name added to the view container
     * @property {String} className
     * @default 'home'
     */
    submit: function(e) {
      IN.API.Profile("me").fields('id','skills','educations','first-name', 'last-name', 'headline', 'location:(name)','distance','summary','specialties','positions', 'picture-url','num-recommenders').result(function(result) {
      //console.log(JSON.stringify(result)) 
      router.exec('/profile')
    });
    }

  });

  return HomeView;

});
