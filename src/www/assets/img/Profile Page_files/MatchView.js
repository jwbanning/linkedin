define(function(require) {

  var BaseView = require('./BaseView'),
  $ = require('$'),

  Transition = require('lavaca/fx/Transition'),
  Transform = require('lavaca/fx/Transform'),
  _transitionProp = Transition.cssProperty(),
  _transitionDurationProp = '-webkit-'+_transitionProp + '-duration',
  _transformProp = Transform.cssProperty();

  router = require('lavaca/mvc/Router');
  require('rdust!templates/match');

  /**
   * Example view type
   * @class app.ui.views.MatchView
   * @extends app.ui.views.BaseView
   */
  var MatchView = BaseView.extend(function MatchView() {
    BaseView.apply(this, arguments);
    this.mapEvent({
      model: {
        'change': this.redrawView.bind(this)
      },
      '.top': {
        'dragstart': this.onDragStart.bind(this),
        'drag': this.onDragMove.bind(this),
        'dragend': this.onDragEnd.bind(this)
      }
    });

  },{

    template: 'templates/match',
    className: 'match',
    
     redrawView: function() {
      this.redraw();
    },
    loadNew: function() {
      var current = this.model.get('currentIndex');
      this.model.set('currentIndex', current+1);
      console.log(this.model.get('currentIndex'))
    },
    onDragStart:function(e){
      $(e.currentTarget).css(_transitionDurationProp, '0');
   },
   onDragMove: function(e) {
    e.stopPropagation();
      $(e.currentTarget).css(_transitionDurationProp, '0s');
      if(e.gesture.direction=="left") {
        $(e.currentTarget).css(_transformProp, 'translate3d('+ e.gesture.deltaX +'px,' + e.gesture.deltaY + 'px,  0) scale(1.01) rotate(-2deg)');  
      }
      else if(e.gesture.direction=="right") {
        $(e.currentTarget).css(_transformProp, 'translate3d('+ e.gesture.deltaX +'px,' + e.gesture.deltaY + 'px,  0) scale(1.01) rotate(2deg)');  
      }
   },
   onDragEnd:function(e) {
    var current = this.model.get('currentIndex');

    if(e.gesture.direction=="left" &&  Math.abs(e.gesture.deltaX) > 70) {
     $(e.currentTarget).css(_transitionDurationProp, '0.5s');
      $(e.currentTarget).css(_transformProp, 'translate3d('+ (e.gesture.deltaX + -200) +'px,' + (e.gesture.deltaY + 50) + 'px,  0)');

      this.el.nextTransitionEnd(function() {
        this.model.set('currentIndex', current+1);
      }.bind(this));
     
    }
    else if(e.gesture.direction=="right"  && Math.abs(e.gesture.deltaX) > 70) {
      $(e.currentTarget).css(_transitionDurationProp, '0.5s');
      $(e.currentTarget).css(_transformProp, 'translate3d('+ (e.gesture.deltaX + 200) +'px,' + (e.gesture.deltaY + 50) + 'px,  0)'); 
      this.el.nextTransitionEnd(function() {
        this.model.set('currentIndex', current+1);
      }.bind(this));
    }
    else {
      $(e.currentTarget).css(_transitionDurationProp, '0.5s');
      $(e.currentTarget).css(_transformProp, 'translate3d('+ 0 +'px,' + 0 + 'px,  0)'); 
    }
   }
  



  });

  return MatchView;

});
