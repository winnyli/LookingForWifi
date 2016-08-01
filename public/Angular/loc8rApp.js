var app = angular.module('loc8rApp', []);

var _isNumeric = function(n){
	return !isNaN(parseFloat(n)) && isFinite(n);
};

var formatDistance = function(){
	return function(distance){
	    var numDistance, unit;
	    if (distance && _isNumeric(distance) ) {
	    	if (distance > 1) {
		        numDistance = parseInt(distance).toFixed(1);
		        unit = 'km';
	    	}else{
		        numDistance = parseInt(distance*1000, 10);
		        unit = 'm';
	    	}
	    	return numDistance+unit;
	    }else{
	    	return '?';
	    }	    
	    
	}
}

var ratingStars = function(){
	return{
		scope: {
			thisRating: '=rating'
		},
		templateUrl: '/Angular/rating-stars.html'
	};
};

var loc8rData = function($http){
	var locationByCoords = function(lat, lng){
		return $http.get('/api/locations?lng='+ lng +'&lat='+ lat +'&maxDistance=20')
	}
	return {locationByCoords: locationByCoords};
}


var locationListCtrl = function($scope, loc8rData, geolocation){
	$scope.message = '正在确定你的地点，请稍后';

	$scope.getData = function(position){
		$scope.message = '正在搜索，请稍后'
		var lat = position.coords.latitude,
			lng = position.coords.longitude;
		loc8rData.locationByCoords(lat, lng)
			.success(function(data) {
				$scope.message = data.length ? '' : '很抱歉，没有找到您附近的地点';
				$scope.data = { locations: data };
			})
			.error(function (e) {
				$scope.message = '对不起，什么地方出错了';
			});
	};
	$scope.showError = function(error){
		$scope.$apply(function(){
			$scope.message = error.message
		})
	};
	$scope.noGeo = function(){
		$scope.$apply(function(){
			$scope.message = '您的浏览器不支持自动获取地理信息';
		})
	}

	geolocation.geoPosition($scope.getData, $scope.showError, $scope.noGeo);
};

var geolocation = function(){
	var geoPosition = function(cbSuccess, cbError, cbNoGeo){
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(cbSuccess, cbError);
		}else{
			cbNoGeo();
		}
	}
	return {geoPosition:geoPosition};
}

app.controller('locationListCtrl', locationListCtrl)
	.filter('formatDistance', formatDistance)
	.directive('ratingStars', ratingStars)
	.service('loc8rData', loc8rData)
	.service('geolocation', geolocation);