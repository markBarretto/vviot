module.exports = Motion;

var QueueCommand = require('../classes/queueCommand.js');
var MotorMovement = require('../classes/motor.js');

function Motion(dia, dist){
	this.leftMotor = new MotorMovement(3,2,2,200);
	this.rightMotor = new MotorMovement(14,15,2,200);
	this.wheelDiameter = dia;
	this.distanceBetweenWheels = dist; 
   this.queue = [];
}


Motion.prototype.execQueue = function(){
   var t = this;
   var queue = t.queue;

   for(var i=0; i<queue.length; i++) {
	var queueCommand = queue[i];

	switch(queueCommand.type){
		case 'move' :
		   t.move(queueCommand.direction, queueCommand.steps);	
		break;
		case 'turn' :
		   t.turn(queueCommand.direction, queueCommand.steps);
		break;
	}

   }

}

Motion.prototype.getCirc = function(){
   return  this.distanceBetweenWheels*Math.PI;
}

Motion.prototype.move = function(direction, steps){
   var t = this;
   var dir;
   direction == undefined? dir = 1: dir = undefined;
   console.log(direction);
   t.leftMotor.move(dir, steps);
   t.rightMotor.move(direction, steps);
}

Motion.prototype.turn = function(direction, steps){
   var t = this;
   t.leftMotor.move(direction, steps);
   t.rightMotor.move(direction, steps);
}