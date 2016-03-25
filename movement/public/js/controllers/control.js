(function(){
	angular.module('vviot').controller('ControlController', function(socket, $scope){
//	angular.module('vviot').controller('ControlController', function(){
		var vm = this;

		$scope.$on('socket:control:queue', function (ev, data) {
        	vm.queue = data;
        	console.log(data);
    	});

		vm.move = function(direction){
			socket.emit('control:move', {direction: direction});
		}

		vm.turn = function(direction){
			socket.emit('control:turn', {direction: direction});
		}

	})
})()