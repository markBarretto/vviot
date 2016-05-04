var Motion = require('./classes/motion.js');
var QueueCommand = require('./classes/queueCommand.js');

var socket = function(io){
	var botMove = new Motion();
	var queue = botMove.queue;

	var sendUpdatedQueue = function(queue){
		io.sockets.emit('control:queue', {'queue':queue});
	}

	io.on('connection', function(socket){
		console.log('a user connected');

		socket.on('disconnect', function(){
    		console.log('user disconnected');
  		});

  		socket.on('control:move', function (data) {
  			//queue.push(new QueueCommand(data.type, data.direction, data.steps));
			botMove.queue.push(new QueueCommand(data.type, data.direction, data.steps));
			sendUpdatedQueue(botMove.queue);
			console.log('forward pressed');
			console.log(botMove.queue.length);

			/*switch(data.direction){
				case 'forward':
                                        botMove.move(undefined, 400);
				break;
				case 'back':
                                        botMove.move(1, 400);
				break;
				default:
				break;
			}*/
			

    		});

		socket.on('control:exec', function (data) {
			botMove.execQueue(data);
		});
		
		socket.on('control:clear', function (data) {
			//queue = [];
			botMove.queue = [];
			sendUpdatedQueue(botMove.queue);
		        console.log('clear pressed');
			console.log(botMove.queue.length);
		});

    		socket.on('control:turn', function(data){
    			botMove.queue.push(new QueueCommand(data.type, data.direction, data.steps));
    			sendUpdatedQueue(botMove.queue);
			console.log(botMove.queue);
/*
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
*/    		});
	});
}

module.exports = socket;
