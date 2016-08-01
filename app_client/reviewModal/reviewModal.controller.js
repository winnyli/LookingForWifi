(function(){
	angular.module('loc8rApp')
		.controller('reviewModalCtrl', reviewModalCtrl);

	reviewModalCtrl.$inject =  ['$uibModalInstance', 'loc8rData','locationData'];
	function reviewModalCtrl($uibModalInstance, loc8rData, locationData){
		var vm = this;
		vm.locationData = locationData;

		vm.onSubmit = function(){
			vm.formError = "";
			if(!vm.formData.rating || !vm.formData.reviewText) {
				vm.formError = "请补全必填项";
				return false;
			} else {
				vm.doAddReview(vm.locationData.locationid, vm.formData);
			}
		};

		vm.doAddReview = function(locationid, formData){
			loc8rData.addReviewById(locationid, {
//				author: formData.name,
				rating: formData.rating,
				reviewText: formData.reviewText
			})
				.success(function(data){
					vm.modal.close(data)
				})
				.error(function(err){
					vm.formError = "没有提交成功，请重试";
				})
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