(function(){
	angular.module('loc8rApp')
		.controller('locationModalCtrl', locationModalCtrl);

	locationModalCtrl.$inject =  ['$uibModalInstance', 'loc8rData','geolocation'];
	function locationModalCtrl($uibModalInstance, loc8rData, geolocation){
		var vm = this;
//			vm.locationData = locationData;

		vm.onSubmit = function(){
			vm.formError = "";
			if(!vm.formData.locationName || !vm.formData.locationAddress || !vm.formData.rating || !vm.formData.facilities) {
				vm.formError = "请补全必填项";
				return false;
			} else {
				vm.doAddLocation(vm.formData);
			}
		};

		vm.doAddLocation = function(formData){

			vm.getData = function(position){
				vm.lat = position.coords.latitude,
		        vm.lng = position.coords.longitude;
		        // alert(vm.lng);
		        // alert(vm.lat);
		        loc8rData.addLocation({
					name: formData.locationName,
					address: formData.locationAddress,
					rating: formData.rating,
					facilities: formData.facilities,
					days1: formData.days1,
					opening1:formData.opening1,
					closing1:formData.closing1,
					days2: formData.days2,
					opening2:formData.opening2,
					closing2:formData.closing2,
					lng: vm.lng,
					lat: vm.lat
	 			})
	 				.success(function(data){
	 					alert('提交成功');
	 					vm.modal.close(data);
	 				})
	 				.error(function(err){
	 					vm.formError = "没有提交成功，请重试";
	 				})
			}	 
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
	
			geolocation.getPosition(vm.getData, vm.showError, vm.noGeo);
			
		};
	
		   
		   	

		vm.modal = {
			close: function (result) {
				$uibModalInstance.close(result);
			},
			cancel: function () {
				$uibModalInstance.dismiss('cancel');
			}
		};
	}
})();