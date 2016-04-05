module.exports = Motion;

var MotorMovement = require('../classes/motor.js');

function Motion(dia, dist){
	this.leftMotor = new MotorMovement(3,2,2,200);
	this.rightMotor = new MotorMovement(14,15,2,200);
	this.wheelDiameter = dia;
	this.distanceBetweenWheels = dist; 
}

Motion.prototype.getCirc = function(){
   return  this.distanceBetweenWheels*Math.PI;
}

Motion.prototype.turn = function(direction, steps){
   var t = this;
   var dir;
   direction == undefined? dir = 1: dir = undefined;
   console.log(direction);
   t.leftMotor.move(dir, steps);
   t.rightMotor.move(direction, steps);
}

Motion.prototype.move = function(direction, steps){
   var t = this;
   t.leftMotor.move(direction, steps);
   t.rightMotor.move(direction, steps);
}