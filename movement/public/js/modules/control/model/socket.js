(function(){

	angular.module('vviot.control').factory('socket', function(socketFactory) {
        var socket = socketFactory();
        socket.forward('control:queue');
        return socket;
	});
	
})()