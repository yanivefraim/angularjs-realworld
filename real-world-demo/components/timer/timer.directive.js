(function(){
	angular.module('demo.timer')
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
	}	

})();