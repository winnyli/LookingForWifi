(	function(){
		angular.module('loc8rApp')
			.controller('homeCtrl', homeCtrl);
		
		homeCtrl.$inject = ['$scope', 'loc8rData', 'geolocation'];
		function homeCtrl($scope, loc8rData, geolocation){
			var vm = this;
			vm.pageHeader = {
				title: '找WIFI',
				strapline: '随时随地共享WIFI生活!'
			};
			vm.sidebar = {
				content: '找WIFI帮你找到最近最稳定的WIFI热点，助你随时随地移动办公'
			};
			vm.message = '正在确定您的地点，请稍后···';
	
			vm.getData = function (position) {
		      var lat = position.coords.latitude,
		          lng = position.coords.longitude;
		      vm.message = "正在搜索，请稍后···";
		      loc8rData.locationByCoords(lat, lng)
		        .success(function(data) {
		          vm.message = data.length > 0 ? "" : "没有找到您附近的地点, 您可以添加附件第一个地点";
		          vm.data = { locations: data };
		          console.log(vm.data);
		        })
		        .error(function (e) {
		          vm.message = "对不起，什么地方出错了";
		        });
		    };
	
		    vm.showError = function (error) {
		      $scope.$apply(function() {
		        vm.message = error.message;
		      });
		    };
	
		    vm.noGeo = function () {
		      $scope.$apply(function() {
		        vm.message = "您的浏览器不支持自动获取地理信息.";
		      });
		    };
	
		    geolocation.getPosition(vm.getData,vm.showError,vm.noGeo);	
		}
	})();