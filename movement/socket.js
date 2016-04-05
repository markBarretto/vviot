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

			switch(data.direction){
				case 'forward':
                                        botMove.move(undefined, 400);
				break;
				case 'back':
                                        botMove.move(1, 400);
				break;
				default:
				break;
			}
    		});

    		socket.on('control:turn', function(data){
    			queue.push({'turn':data});
    			sendUpdatedQueue(queue);

			switch(data.direction){
				case 'left':
                                        botMove.turn(undefined, 400);
				break;
				case 'right':
                                        botMove.turn(1, 400);
				break;
				default:
				break;
			}
    		});
	});
}

module.exports = socket;
