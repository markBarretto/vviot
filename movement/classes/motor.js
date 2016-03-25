var gpio = require('rpi-gpio');
var q = require('q');

function MotorMovement(movement, direction, speed, steps){
   this.movement = movement;
   this.direction = direction;
   this.speed = speed;
   this.stepsPerRotation = steps;
}

MotorMovement.prototype.writeDirectionPin = function(input){
   var val = (input!=undefined);
   var deferred = q;
   gpio.setup(this.direction, gpio.DIR_OUT, function(){
      this.write(this.direction, val)
      deferred.resolve();
   });
   return deferred.promise;
}

MotorMovement.prototype.writeMovementPin = function(input){
   var val = (input!=undefined);
   var deferred = q;
   gpio.setup(this.movement, gpio.DIR_OUT, function(){
      this.write(this.movement, val)
      deferred.resolve();
   });
   return deferred.promise;
}


MotorMovement.prototype.write = function(input, value){
   var deferred = q.defer();
   gpio.write(input, value, function(err) {
      if(err){
         throw err;
         deferred.reject(err);
      } else {
         deferred.resolve('Written to pin');
      }
   });

   return deferred.promise;
}

MotorMovement.prototype.move = function(reverse){
   var deferred = q.defer();
   var t = this;
   direction = (reverse!=undefined);
   
   this.writeMovementPin(true).then(function(){
      setTimeout(function(){
         t.writeDirectionPin(direction).then(function(){
            t.writeMovementPin().then(function(){
               deferred.resolve('moved');
            })
         }, function(err){
            deferred.reject(err);  
         });
      }, t.speed);
   })
   

   return deferred.promise;
}

module.exports = MotorMovement;
