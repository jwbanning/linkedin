define(function(require) {

  var BaseView = require('./BaseView'),
  $ = require('$'),
  APIdoc = require('app/data/APIdoc');
  require('rdust!templates/jobs');
  headerView = require('app/ui/views/controls/HeaderView');
  router = require('lavaca/mvc/Router');



  /**
   * Example view type
   * @class app.ui.views.JobsView
   * @extends app.ui.views.BaseView
   */
  var JobsView = BaseView.extend(function JobsView() {
    BaseView.apply(this, arguments);
    this.mapEvent({
      model: {
        'change': this.redrawView.bind(this)
      },
      'input': {
        'keydown': this.searchResults.bind(this)
      },
      '.submit': {
        'tap': this.returnResults.bind(this)
      }
    });

  },{

    template: 'templates/jobs',
    className: 'jobs',
    
     redrawView: function() {
      this.redraw();
    },
    searchResults: function(e) {
      var value = $(e.currentTarget).val();

    },
    returnResults: function(e) {
      this.model.search();

    }


  });

  return JobsView;

});
