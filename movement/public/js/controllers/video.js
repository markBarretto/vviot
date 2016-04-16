(function(){
	angular.module('vviot').controller('VideoController', function(){
		var vm = this;

		vm.path = window.location.hostname+':3000';
	})
})()