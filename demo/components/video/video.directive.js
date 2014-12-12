(function(){
	angular.module('app.video')
				.directive('demoVideo', demoVideo);

	function demoVideo(){
		var currentTime = -1;
		return{
			scope:{
				videoData: "="
			},
	        templateUrl: "videoTemplate.html",
	        controller: function($sce,$scope){
				$scope.videoDataUrlMp4 = $sce.trustAsResourceUrl($scope.videoData.video);
	        },
	        link: function(scope, element, attrs){
	        	var video = element.find('video');
	        	video.bind('timeupdate', function(){
        			var time = parseInt(video[0].currentTime);
        			if( time !== currentTime ){
                        currentTime = time;
                    	scope.$emit('video.timeTick', time);
                    }
	        	});
	        }
	        
	    }
	}	 

})();