(function(){
	angular.module('app.videoPage').controller('VideoPageCtrl',VideoPageCtrl);

	function VideoPageCtrl(videoData){
		var vm = this;
		vm.videoData = videoData;
	}

})();
