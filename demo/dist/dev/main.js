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
    "<script type=text/ng-template id=timerTemplate.html><div style=\"height: 50px;\">{{timer.time}}</div></script><script type=text/ng-template id=videoTemplate.html><video id=\"video\" controls=\"true\">\n" +
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
// Karma configuration
// Generated on Wed Jan 01 2014 12:26:05 GMT+0200 (IST)

module.exports = function(config) {
    config.set({

        // base path, that will be used to resolve files and exclude
        basePath: '',

        plugins: [
            'karma-jasmine',
            /*'karma-firefox-launcher',*/
            'karma-chrome-launcher',
            'karma-phantomjs-launcher',
            'karma-junit-reporter'

        ],

        // frameworks to use
        frameworks: ['jasmine'],


        // list of files / patterns to load in the browser
        files: [
            'http://ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js',
            'http://ajax.googleapis.com/ajax/libs/angularjs/1.3.0/angular.min.js',
            'http://ajax.googleapis.com/ajax/libs/angularjs/1.3.0/angular-route.js',
            'http://code.angularjs.org/1.3.0/angular-mocks.js',
            'dist/dev/*.js',
            '**/*.spec.js'

        ],

        /*preprocessors : {
         '../build/html*//*.html': ['ng-html2js']
         },*/

        /*ngHtml2JsPreprocessor: {
         cacheIdFromPath: function(filepath) {
         // If you had more than one html file you would want to do something more clever here.
         return 'inlinetemplates';
         },
         moduleName: 'inlinetemplates'
         },*/

        // list of files to exclude
        exclude: [

        ],


        // test results reporter to use
        // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
        reporters: ['progress'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera (has to be installed with `npm install karma-opera-launcher`)
        // - Safari (only Mac; has to be installed with `npm install karma-safari-launcher`)
        // - PhantomJS
        // - IE (only Windows; has to be installed with `npm install karma-ie-launcher`)
        browsers: ['Chrome'],


        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 60000,


        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: false
    });
};

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
