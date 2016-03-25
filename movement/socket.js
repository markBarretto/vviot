var Motion = require('./classes/motion.js');

var socket = function(io){
	var botMove = new Motion();
	var queue = [];

	var sendUpdatedQueue = function(queue){
		io.sockets.emit('control:queue', {'queue':queue});
	}

	io.on('connection', function(socket){
		console.log('a user connected');

		socket.on('disconnect', function(){
    		console.log('user disconnected');
  		});
  		socket.on('control:move', function (data) {
  			queue.push({'move':data});
  			sendUpdatedQueue(queue);
    	});
    	socket.on('control:turn', function(data){
    		queue.push({'turn':data});
    		sendUpdatedQueue(queue);
    	});
	});
}

module.exports = socket;
