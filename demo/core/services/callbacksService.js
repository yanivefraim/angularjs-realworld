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
})();