// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('tcpTestApp', ['ionic', 'tcpTestApp.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('app.connections', {
    url: '/connections',
    views: {
      'tab-connections': {
        templateUrl: 'templates/tab-connections.html',
        // The controller is not needed since 'tcpController' is not specific to this view and is already applied in index.html
        // controller: 'tcpController'
      }
    }
  })

  .state('app.control', {
    url: '/control',
    views: {
      'tab-control': {
        templateUrl: 'templates/tab-control.html',
        // The controller is not needed since 'tcpController' is not specific to this view and is already applied in index.html
        // controller: 'tcpController'
      }
    }
  })

  .state('app.telemetry', {
    url: '/telemetry',
    views: {
      'tab-telemetry': {
        templateUrl: 'templates/tab-telemetry.html',
        // The controller is not needed since 'tcpController' is not specific to this view and is already applied in index.html
        // controller: 'tcpController'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/connections');

});
