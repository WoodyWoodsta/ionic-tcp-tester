// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('tcpTestApp', ['ionic'])

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

.controller('tcpTestCtrl', function($scope) {
  $scope.header = 'Click a button!';
  $scope.isConnected = false;
  $scope.footer = 'Disconnected';
  $scope.cardInfo = 'No info to display';
  $scope.cardStatus = 'Waiting for connect';

  if (window.cordova) {
    var connectionProperties = new SocketProperties;
    var connectionInfo = new SocketInfo;
  }

  $scope.connectTCP = function(properties) {
    $scope.setFooter('Connecting...');

    if (window.cordova) {
      $scope.cardStatus = 'Creating TCP Instance';
      cordova.plugins.sockets.tcp.create(connectionProperties, function(createInfo) {
        $scope.cardStatus = 'TCP instance created!';
        $scope.cardInfo = createInfo;
      })
    } else {
      $scope.setFooter('Plugin not running');
      $scope.cardStatus = 'No TCP instance';

      console.log('No Cordova found here!');
    }
  }

  $scope.setFooter = function(newFooter) {
    $scope.footer = newFooter;
  }

  $scope.setHeader = function(newHeader) {
    $scope.header = newHeader;
  }

  $scope.setTCPStatus = function(newState) {
    $scope.isConnected = newState;
  }
})
