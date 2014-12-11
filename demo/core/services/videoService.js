(function(){
    angular.module('app')
        .factory('videoService', function($http){
        	var getData = function(){
    			return $http.get('../../assets/data.json').then(function(res){
    				return res.data;
    			});
        	};

        	return{
        		get: getData
        	}
        });
})();

