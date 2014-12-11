(function(){
	angular.module('app.video')
				.directive('demoVideo', demoVideo);


	function demoVideo(){
		return{
			scope:{
				videoData: "="
			},
	        templateUrl: "videoTemplate.html",
	        controller: function($sce,$scope){

				$scope.videoDataUrlMp4 = $sce.trustAsResourceUrl($scope.videoData.video);

        		//videoService.get().then(function(data){
        		//	vm.videoDataUrlMp4 = $sce.trustAsResourceUrl(data.video);//"http://pdl.vimeocdn.com/89496/595/203684545.mp4?token2=1418313891_4826d99475da5695f5d7999863fb212c&aksessionid=732c8c4ae38ae4aa"
        		//});
	        },
	        
	    }
	}	 

})();