(function(){
	angular.module('loc8rApp')
		.controller('locationDetailCtrl', locationDetailCtrl);

	locationDetailCtrl.$inject = ['$routeParams', '$location','$uibModal','loc8rData', 'authentication'];
	function locationDetailCtrl($routeParams,$location, $uibModal, loc8rData,  authentication){
		var vm = this;
		vm.locationid = $routeParams.locationid;
		vm.isLoggedIn = authentication.isLoggedIn();
		vm.currentPath = $location.path();

		loc8rData.locationById(vm.locationid)
			.success(function(data){
				vm.data = {
					location: data
				};
				vm.pageHeader = {
					title: vm.data.location.name
				};				
			})
			.error(function(err){
				console.log(err);
			});

		vm.popupReviewForm = function(){
			var uibModalInstance = $uibModal.open({
				templateUrl : '/reviewModal/reviewModal.view.html',
				controller: 'reviewModalCtrl as vm',
				resolve:{
					locationData: function(){
						return {locationid: vm.locationid,
								locationName: vm.data.location.name
							}
					}
				}
			});

			uibModalInstance.result.then(function (data) {
				vm.data.location.reviews.push(data);
			});
		};

		vm.sidebar= {
            context: '详细信息由本页提供。您可以在这里享受免费而稳定的WIFI，继而进行移动办公。同时，这个地点还会提供茶水、小吃等温馨服务',
            callToAction: '如果您对本地点有任何想法，比如批评或者赞赏，请不要吝啬添加评论和打星'
        };
	}
})();