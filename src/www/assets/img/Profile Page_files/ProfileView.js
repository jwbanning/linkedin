define(function(require) {

  var BaseView = require('./BaseView'),
  $ = require('$'),
  APIdoc = require('app/data/APIdoc');
  require('rdust!templates/profile');

  Transition = require('lavaca/fx/Transition'),
  Transform = require('lavaca/fx/Transform'),
  router = require('lavaca/mvc/Router'),
  _transitionProp = Transition.cssProperty(),
  _transitionDurationProp = _transitionProp + '-duration',
  _transformProp = Transform.cssProperty();


  /**
   * Example view type
   * @class app.ui.views.ProfileView
   * @extends app.ui.views.BaseView
   */
  var ProfileView = BaseView.extend(function ProfileView() {
    BaseView.apply(this, arguments);
    this.mapEvent({
      model: {
        'change': this.redrawView.bind(this)
      },
      '.slide-container': {
        'dragstart': this.onDragStart.bind(this),
        'drag': this.onDragMove.bind(this),
        'dragend': this.onDragEnd.bind(this)
      }
    });

    this.on('enter', this.setSlideWidth.bind(this));

  },{

    template: 'templates/profile',
    className: 'profile',
    currentColumnIndex: 0,
    viewPortWidth: 0,

    redrawView: function() {
      this.redraw();
      this.setSlideWidth();
    },
    setSlideWidth: function() {
      var slideWidth = $(this.el).closest('#view-root').width();
      var slideHeight = $(this.el).closest('#view-root').height();
      this.viewPortWidth = slideWidth;
      $('.slide').css("width",slideWidth);
      $('.slide').css("height",slideHeight);
    },
    translateX: function(x, gesture) {
      var translateDistance = x + (-this.viewPortWidth * this.currentColumnIndex);
      this.el.find('.slide-container').css(_transformProp, 'translate3d('+ translateDistance +'px, 0px,  0)');
    },
    translateToSlide:function(slideIndex,column,e){
      if(e.gesture.direction=="left" || e.gesture.direction=="right") {
       this.el.find('.slide-container').css(_transitionDurationProp, '0.2s');
       this.translateX(0,slideIndex);
     }
    },
    onDragStart:function(e){
      this.el.find('.slide-container').css(_transitionDurationProp, '0');
   },
   onDragMove: function(e) {
    e.stopPropagation();
    if(e.gesture.direction=="left" || e.gesture.direction=="right"){
       this.translateX(e.gesture.deltaX);
     }
     else{
       return;
     }
   },
   onDragEnd: function(e) {
     if(e.gesture.direction=="left" || e.gesture.direction=="right") {
       if (Math.abs(e.gesture.deltaX) > 70) {
        if (this.currentColumnIndex == 0 && e.gesture.deltaX > 0) {
          this.el.find('.slide-container').css(_transitionDurationProp, '0.3s');
          this.translateX(0);
        }
        else if(this.currentColumnIndex == $('.slide').length - 1 && e.gesture.deltaX < 0) {
          this.el.find('.slide-container').css(_transitionDurationProp, '0.3s');
          this.translateX(0);
        }
        else {
          this.currentColumnIndex = e.gesture.deltaX > 0 ? this.currentColumnIndex +(-1) : this.currentColumnIndex +1;
          this.translateToSlide(this.currentColumnIndex,0,e);  
          this.currentMenuIndex = 0;

          var currentColumn = this.currentColumnIndex;
        }
       }
       else {
         this.el.find('.slide-container').css(_transitionDurationProp, '0.2s');
         this.translateX(0);
       }
    
    }
   }


  });

  return ProfileView;

});
