define(function(require) {

  var View = require('lavaca/mvc/View'),
      stateModel = require('app/models/StateModel'),
      $ = require('jquery'),
      DrawerWidget = require('app/ui/widgets/DrawerWidget');
  require('rdust!templates/header');

  /**
   * Header view type
   * @class app.ui.views.globalUI.HeaderView
   * @super Lavaca.mvc.View
   */
  var HeaderView = View.extend(function(){
      View.apply(this, arguments);
      this.mapEvent({
        model: {
          change: this.onModelChange.bind(this)
        },
        '.click':{
          'tap': this.onTapButton.bind(this)
        }
      });
      this.drawer = new DrawerWidget($('#main'),'left');
    }, {
    template: 'templates/header',
    className: 'header',
    onModelChange: function() {
      this.redraw('.title');
    },
    onTapButton:function(e){
      this.drawer.toggle();
      // if('.ui-blocker')
      // $('.ui-blocker').addClass('show');
      
    }
  });
  
  
  return new HeaderView('#nav-header', stateModel);
});
