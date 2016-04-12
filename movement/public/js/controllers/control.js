(function(){
	angular.module('vviot').controller('ControlController', function(socket, $scope){
//	angular.module('vviot').controller('ControlController', function(){
		var vm = this;

		$scope.$on('socket:control:queue', function (ev, data) {
        	vm.queue = data;
        	console.log(data);
    	});

		vm.move = function(direction){
			socket.emit('control:move', {direction: direction, steps: 200, type: "move"});
		}

		vm.turn = function(direction){
			socket.emit('control:turn', {direction: direction, steps: 200, type: "turn"});
		}

		vm.exec = function(direction){
			socket.emit('control:exec', {direction: direction});
		}

	})
})()