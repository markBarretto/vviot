var Gpio = require('onoff').Gpio;
var q = require('q');

function MotorMovement(movement, direction, interval, steps){
   this.dirPin = new Gpio(2, 'out');
   this.movPin = new Gpio(3, 'out');
   this.interval = interval;
   this.stepsPerRotation = steps;
}

MotorMovement.prototype.step = function(input){
   var deferred = q;
   var t = this;
   var val = 0;
   
   if(input!=undefined){
      val = 1;
   }
   if(t.dirPin.readSync != val){
      t.dirPin.writeSync(val);
   }

   if(t.movPin.readSync()===1){
      t.movPin.writeSync(0);
   };

   setTimeout(t.movPin.writeSync(1), t.interval);
}

module.exports = MotorMovement;
