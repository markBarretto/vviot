module.exports = Motion;

var MotorMovement = require('../classes/Motor');

function Motion(dia, dist){
	this.leftMotor = new MotorMovement(2,3,1,200);
	this.rightMotor = new MotorMovement(14,15,1,200);
	this.wheelDiameter = dia;
	this.distanceBetweenWheels = dist; 
}

Motion.prototype.getCirc = function(){
   return  this.distanceBetweenWheels*Math.PI;
}