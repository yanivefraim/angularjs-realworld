(function() {
    'use strict';

    angular.module('app', [
    	'ngRoute',
        'app.timer',
        'app.video',
        'templates-main',
        'app.videoPage'
    ])
    .run(function($templateCache, $compile, $rootScope, callbackService){
			var templatesHTML = $templateCache.get('demo-templates');
        	$compile(templatesHTML)($rootScope);	
            callbackService.init();
	});

})();
