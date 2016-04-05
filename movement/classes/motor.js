var Gpio = require('onoff').Gpio;
var q = require('q');

function MotorMovement(movement, direction, interval, steps){
   this.dirPin = new Gpio(direction, 'out');
   this.movPin = new Gpio(movement, 'out');
   this.interval = interval;
   this.stepsPerRotation = steps;
}

MotorMovement.prototype.step = function(input){
   var deferred = q.defer();
   var t = this;
   var val = 0;

   if(input!=undefined){
      val = 1;
   }

   try {
      if(t.dirPin.readSync != val){
         t.dirPin.writeSync(val);
      }

      if(t.movPin.readSync()===1){
         t.movPin.writeSync(0);
      };

      t.movPin.writeSync(1);

      deferred.resolve('step');
   }catch(e){
      deferred.reject(e);
   }

   return deferred.promise;
}

MotorMovement.prototype.move = function(direction, steps){
   var deferred = q.defer();
   var t = this;
   var count = 0;

   function step(direction){
      return t.step(direction).then(function(){
         setTimeout(function(){
            if(count <= steps){
               console.log(count);

               step(direction);
               count++;
            } else {
               deferred.resolve('stepped '+count);
            }
         }, t.interval);
      }, function(error){
         deferred.reject(error);
      });
   }
   
   step(direction);

   return deferred.promise;
}

module.exports = MotorMovement;
