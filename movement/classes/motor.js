var gpio = require('rpi-gpio');
var q = require('q');

function MotorMovement(movement, direction, speed, steps){
   this.movement = movement;
   this.direction = direction;
   this.speed = speed;
   this.stepsPerRotation = steps;
}

MotorMovement.prototype.move = function(reverse){
   var deferred = q.defer();
   direction = (reverse!=undefined);
   
   this.write(this.movement, true).then(function(){
      setTimeout(function(){
         this.write(this.direction, direction).then(function(){
            this.write(this.movement, false).then(function(){
               deferred.resolve('moved');
            })
         }, function(err){
            deferred.reject(err);  
         });
      }, this.speed);
   })
   

   return deferred.promise;
}

MotorMovement.prototype.init = function(){
   gpio.setup(this.movement, gpio.DIR_OUT, this.write(this.movement));
   gpio.setup(this.direction, gpio.DIR_OUT, this.write(this.direction));
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

module.exports = MotorMovement;
