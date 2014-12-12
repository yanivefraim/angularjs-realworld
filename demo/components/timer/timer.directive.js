(function(){
	angular.module('app.timer')
				.directive('demoTimer', demoTimer);


	function demoTimer(){
		return{
	        templateUrl: "timerTemplate.html",
	        controller: function($scope){
	        	var vm = this;
        		$scope.$on('video.timeTick', function(event, message){
        			$scope.$apply(function(){
        				vm.time = message;	
        			});
        		});
	        },
	        bindToController: true,
	        controllerAs: 'timer'
	    };
	}	

})();