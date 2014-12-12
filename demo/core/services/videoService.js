(function(){
    angular.module('app')
        .factory('videoService', function($http){
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
        });
})();

