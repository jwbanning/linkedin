define(function(require) {
  var History = require('lavaca/net/History');
  var HomeController = require('./net/HomeController');
  var Connectivity = require('lavaca/net/Connectivity');
  var Application = require('lavaca/mvc/Application');
  var Translation = require('lavaca/util/Translation');
  var headerView = require('app/ui/views/controls/HeaderView');
  var DrawerView = require('app/ui/views/controls/DrawerView');
  var DrawerWidget = require('app/ui/widgets/DrawerWidget');
  var Parse = require('parse');
  require('lavaca/ui/DustTemplate');
  require('hammer');

  Parse.initialize("65JAGIpe4OVcroX4AxY58DWujZs7QMUuugseq9br", "pY7SqGHLOaOfWjSqCkAe7kRguLHsPCKk1px1sOIi");
  this.drawer = new DrawerWidget($('#main'),'left');
  // Uncomment this section to use hash-based browser history instead of HTML5 history.
  // You should use hash-based history if there's no server-side component supporting your app's routes.
  History.overrideStandardsMode();

  /**
   * Global application-specific object
   * @class app
   * @extends Lavaca.mvc.Application
   */
  var app = new Application(function() {
    // Add routes
    this.router.add({
      '/': [HomeController, 'index'],
      '/jobs': [HomeController, 'jobs'],
      '/profile': [HomeController, 'profile'],
      '/match': [HomeController, 'match']
    });
    // Initialize messages
    Translation.init('en_US');
    //render header
    //headerView.render();
    DrawerView.render();
  });

  // Setup offline AJAX handler
  Connectivity.registerOfflineAjaxHandler(function() {
    var hasLoaded = Translation.hasLoaded;
    alert(hasLoaded ? Translation.get('error_offline') : 'No internet connection available. Please check your settings and connection and try again.');
  });

  return app;

});


// Company:

// MM

// Application Name:

// RecruitMe

// API Key:

// 750bo3mmwmopn0

// Secret Key:

// cXcgJJepVRkbCL1C

// OAuth User Token:

// fc39121b-8771-4ca9-b1ac-7683fe4ba699

// OAuth User Secret:

// c7ed5eb7-ef74-42e4-b1b3-f9968cabfd87

