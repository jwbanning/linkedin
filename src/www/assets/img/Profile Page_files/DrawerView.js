define(function(require) {

  var View = require('lavaca/mvc/View');
  require('rdust!templates/drawer');
  var Config = require('lavaca/util/Config'),
  router = require('lavaca/mvc/Router'),
  Parse = require('parse'),
  DrawerWidget = require('app/ui/widgets/DrawerWidget'),
  headerView = require('app/ui/views/controls/HeaderView');


  /**
   * Example view type
   * @class app.ui.views.DrawerView
   * @extends app.ui.views.View
   */
  var DrawerView = View.extend(function() {
    View.apply(this, arguments);
    this.mapEvent({
      'li': {
        'click': this.close.bind(this)
      }
    });
  },{
    template: 'templates/drawer',
    className: 'drawer',

    close:function(e) {
      var link = $(e.currentTarget).attr('data-link');
      headerView.drawer.close().then(function() {
        router.exec(link, null, null);
      });
    }

  });

  return new DrawerView('.drawer-wrapper');

});
