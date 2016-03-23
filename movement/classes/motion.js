var motorMovement = require('/motorMovement');

var TwoMotorMovement = function(dia, dist){
   this.leftMotor = new motorMovement(2,3,1,200);
   this.rightMotor = new motorMovement(14,15,1,200);
   this.wheelDiameter = dia;
   this.distanceBetweenWheels = dist; 
}

TwoMotorMovement.prototype.getCirc = function(){
   return  this.distanceBetweenWheels*Math.PI;
}


