angular.module('tcpTestApp.controllers', [])


.controller('tcpController', function($scope) {
  // Place to put info
  $scope.tcpConnection = {
    'isConnected': false, // To be honest, I'm not sure why I'm using this
    'socketId': 0,
    'ip': '192.168.137.1',
    'port': 1338
  };

  // Update strings
  $scope.header = 'Click a button!';
  $scope.footer = 'Disconnected';
  $scope.cardInfo = 'No info to display';
  $scope.cardStatus = 'Waiting for connect';

  // Converts a string into a UTF8 encoded array buffer
  function str2ab(str) {
    var buf = new ArrayBuffer(str.length); // 1 byte for each char
    var bufView = new Uint8Array(buf); // "UTF8" encoding
    for (var i=0, strLen=str.length; i < strLen; i++) {
      bufView[i] = str.charCodeAt(i);
    }
    return buf;
  }

  // Converts a UTF8 encoded array buffer to string
  function ab2str(buf) {
    return String.fromCharCode.apply(null, new Uint8Array(buf));
  }

  // Connect to the TCP server
  $scope.connectTCP = function(properties) {

    // If the plugin is running
    if (window.cordova && window.chrome.sockets.tcp) {

        // Check if there are any open TCP connections
        chrome.sockets.tcp.getSockets(function(socketInfos) {
          // If there are no TCP connections open, create one!
          if (socketInfos.length === 0) {
            $scope.setFooter('Connecting...');
            $scope.cardStatus = 'Creating TCP Instance';
            $scope.$apply();

            chrome.sockets.tcp.create({}, function(createInfo) {
              // Callback on TCP instance creation
              // Update strings
              console.log('TCP Socket ' + createInfo.socketId + ' Created');
              $scope.setCardStatus('TCP instance created!');
              $scope.setFooter('TCP Socket ' + createInfo.socketId + ' Created');
              $scope.setCardInfo(createInfo.socketId);
              $scope.tcpConnection.socketId = createInfo.socketId;
              $scope.$apply();

              // Open the TCP connection
              chrome.sockets.tcp.connect(createInfo.socketId, $scope.tcpConnection.ip, $scope.tcpConnection.port, function(result) {
                // Check for success of tcp connect
                if (result <= 0) {
                  // Update strings
                  $scope.setFooter('Connected');
                  $scope.setCardStatus('TCP Connection Established!');
                  $scope.tcpConnection.isConnected = true;
                  $scope.$apply();

                  // Send a welcome message
                  chrome.sockets.tcp.send($scope.tcpConnection.socketId, str2ab('Hello server!\r\n'));
                } else {
                  // If the connection failed, return the error
                  console.log('TCP Error', result);
                  $scope.setFooter('Disconnected');
                  $scope.setCardStatus('TCP Error', result);
                  $scope.$apply();
                }
              })
            })

            // Wait for data
            chrome.sockets.tcp.onReceive.addListener(function(info) {
              // When we get data, log it and show it in the card
              console.log('We have received data:', info);
              $scope.setCardInfo('Data recieved on socket ' + info.socketId + ': ' + ab2str(info.data));
              $scope.$apply();
            })
          } else {
            // Notify if a connection does in fact exist
            console.log('A TCP connection already exists');
            $scope.setCardInfo('A connection already exists');
          }
        })

    } else {
      // Notify if the tcp plugin or cordova is not present
      console.log('No Cordova found here!');
      $scope.setFooter('Plugin not running');
      $scope.cardStatus = 'No TCP instance';
    }

  }

  // Disconnect the currently used TCP connection and close the socket
  // NOTE: This assumes there is only one socket open and hence only one connection
  $scope.disconnectTCP = function() {
    // Check to see if there are actually any connections
    chrome.sockets.tcp.getSockets(function(socketInfos) {
      // If there is a connection, kill it
      if (socketInfos.length != 0) {
        chrome.sockets.tcp.disconnect($scope.tcpConnection.socketId);
        chrome.sockets.tcp.close($scope.tcpConnection.socketId);
        $scope.tcpConnection.isConnected = false;
        $scope.setFooter('Disconnected');
        $scope.setCardStatus('Waiting for connect');
        $scope.$apply();
      }
    })
  }

  // == Setters (I'm nto sure if this way of doing things is even necessary)
  $scope.setFooter = function(newFooter) {
    $scope.footer = newFooter;
  }

  $scope.setHeader = function(newHeader) {
    $scope.header = newHeader;
  }

  $scope.setCardStatus = function(newCardStatus) {
    $scope.cardStatus = newCardStatus;
  }

  $scope.setCardInfo = function(newCardInfo) {
    $scope.cardInfo = newCardInfo;
  }
});
