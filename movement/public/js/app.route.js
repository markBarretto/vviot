(function(){
	angular.module('vviot').config(['$stateProvider',
	function($stateProvider) {
		$stateProvider
			.state('/', {
                url: "/",
                templateUrl: '/views/home.html',
				views: {
					"video":{
						templateUrl: "/views/partials/video.partials.html",
						controller: "VideoController as vm"
					},
					"control":{
						templateUrl: "/views/partials/control.partials.html",
						controller: "ControlController as vm"
					}
				}
			})	
		}
	]);
})()