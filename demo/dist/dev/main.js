(function() {
    'use strict';

    angular.module('app', [
    	'ngRoute',
        'app.timer',
        'app.video',
        'templates-main',
        'app.videoPage'
    ])
    .run(["$templateCache", "$compile", "$rootScope", "callbackService", function($templateCache, $compile, $rootScope, callbackService){
			var templatesHTML = $templateCache.get('demo-templates');
        	$compile(templatesHTML)($rootScope);	
            callbackService.init();
	}]);

})();

(function(){
	angular.module('app.timer', []);
})();
(function(){
	angular.module('app.video', []);
})();
(function(){
	angular.module('app.videoPage', []);
})();

angular.module('templates-main', []).run(['$templateCache', function($templateCache) {
  $templateCache.put("demo-templates",
    "<script type=text/ng-template id=timerTemplate.html><div class=\"timer\">{{timer.time}}</div></script><script type=text/ng-template id=videoTemplate.html><video id=\"video\" class=\"video-full-screen\" controls=\"true\">\n" +
    "            <source id=\"mp4\" ng-src=\"{{ videoDataUrlMp4 }}\" type=\"video/mp4\">\n" +
    "            <p>Your user agent does not support the HTML5 Video element.</p>\n" +
    "    </video></script><script type=text/ng-template id=videoPageTemplate.html><div>\n" +
    "		<demo-timer></demo-timer>\n" +
    "   		<demo-video video-data=\"videoPageCtrl.videoData\"><demo-video>\n" +
    "	</div></script>");
}]);

(function(){

	function getVideo(videoService){
		return videoService.get();
	}
	getVideo.$inject = ["videoService"];;

	angular.module('app')
		.config(["$routeProvider", function($routeProvider){
			$routeProvider.when('/video', {
	            templateUrl: 'videoPageTemplate.html',
	            controller: 'VideoPageCtrl',
	            controllerAs: 'videoPageCtrl',
	            resolve: {
	            	videoData: getVideo
	            }
	        });

	        $routeProvider.otherwise( { redirectTo: '/video' } );
		}]);

})();
(function(){
	angular.module('app.timer')
				.directive('demoTimer', demoTimer);


	function demoTimer(){
		return{
	        templateUrl: "timerTemplate.html",
	        controller: ["$scope", function($scope){
	        	var vm = this;
        		$scope.$on('video.timeTick', function(event, message){
        			$scope.$apply(function(){
        				vm.time = message;	
        			});
        		});
	        }],
	        bindToController: true,
	        controllerAs: 'timer'
	    };
	}	

})();
(function(){
    angular.module('app.timer')
        .factory('timerService', function(){

        	var getData = function(){

        	};

        	return{
        		get: getData
        	}
        });
})();

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
	        controller: ["$sce", "$scope", function($sce,$scope){
				$scope.videoDataUrlMp4 = $sce.trustAsResourceUrl($scope.videoData.video);
	        }],
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
(function(){
    angular.module('app').factory('callbackService', callbackService);

    function callbackService($rootScope){
    	
    	function init(){
    		$rootScope.$on('video.timeTick', function(event, message){
    			console.log('Pixel Fired: ' + message);
    		});
    	};
    	return{
    		init: init
    	}	
    }
    callbackService.$inject = ["$rootScope"];
})();
(function(){
    angular.module('app')
        .factory('videoService', ["$http", function($http){
        	var dataPromise = null;
            var getData = function(){
                if( dataPromise === null ){
    		        dataPromise = $http.get('../../assets/data.json').then(function(res){
                        return res.data;
                    });
    			};
                return dataPromise;
        	};

            var resetCache = function(){
                dataPromise = null;
            };

        	return{
        		get: getData,
                resetCache: resetCache
        	}
        }]);
})();


(function(){
	angular.module('app.videoPage').controller('VideoPageCtrl',VideoPageCtrl);

	function VideoPageCtrl(videoData){
		var vm = this;
		vm.videoData = videoData;
	}
	VideoPageCtrl.$inject = ["videoData"];
})();
