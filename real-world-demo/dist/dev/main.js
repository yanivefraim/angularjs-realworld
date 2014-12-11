(function() {
    'use strict';

    angular.module('app', [
    	'ngRoute',
        'app.timer',
        'app.video',
        'templates-main',
        'app.videoPage'
    ])
    .run(["$templateCache", "$compile", "$rootScope", function($templateCache, $compile, $rootScope){
			var templatesHTML = $templateCache.get('demo-templates');
        	$compile(templatesHTML)($rootScope);	
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
    "<script type=text/ng-template id=timerTemplate.html><div>{{timer.time}}</div></script><script type=text/ng-template id=videoTemplate.html><video id=\"video\" controls=\"true\">\n" +
    "            <source id=\"mp4\" ng-src=\"{{ videoDataUrlMp4 }}\" type=\"video/mp4\">\n" +
    "            <p>Your user agent does not support the HTML5 Video element.</p>\n" +
    "    </video></script><script type=text/ng-template id=videoPageTemplate.html><div>\n" +
    "		<demo-timer></demo-timer>\n" +
    "   		<demo-video video-data=\"videoPageCtrl.videoData\"><demo-video>	\n" +
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
	        scope: {
	            timerData: "="
	        },
	        templateUrl: "timerTemplate.html",
	        controller: function(){

	        },
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
		return{
			scope:{
				videoData: "="
			},
	        templateUrl: "videoTemplate.html",
	        controller: ["$sce", "$scope", function($sce,$scope){

				$scope.videoDataUrlMp4 = $sce.trustAsResourceUrl($scope.videoData.video);

        		//videoService.get().then(function(data){
        		//	vm.videoDataUrlMp4 = $sce.trustAsResourceUrl(data.video);//"http://pdl.vimeocdn.com/89496/595/203684545.mp4?token2=1418313891_4826d99475da5695f5d7999863fb212c&aksessionid=732c8c4ae38ae4aa"
        		//});
	        }],
	        
	    }
	}	 

})();

(function(){
    angular.module('app')
        .factory('videoService', ["$http", function($http){
        	var getData = function(){
    			return $http.get('../../assets/data.json').then(function(res){
    				return res.data;
    			});
        	};

        	return{
        		get: getData
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
