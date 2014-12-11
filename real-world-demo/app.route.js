(function(){

	function getVideo(videoService){
		return videoService.get();
	};

	angular.module('app')
		.config(function($routeProvider){
			$routeProvider.when('/video', {
	            templateUrl: 'videoPageTemplate.html',
	            controller: 'VideoPageCtrl',
	            controllerAs: 'videoPageCtrl',
	            resolve: {
	            	videoData: getVideo
	            }
	        });

	        $routeProvider.otherwise( { redirectTo: '/video' } );
		});

})();