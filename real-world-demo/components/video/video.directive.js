(function(){
	angular.module('demo.video')
				.directive('demoVideo', demoVideo);


	function demoVideo(){
		return{
	        scope: {
	            videoData: "="
	        },
	        templateUrl: "videoTemplate.html",
	        controller: function(){

	        },
	        bindToController: true,
	        controllerAs: 'timer'
	}	

})();