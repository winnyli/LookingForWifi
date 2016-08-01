(function(){
	angular.module('loc8rApp')
		.controller('navigationCtrl', navigationCtrl)

	navigationCtrl.$inject = ['$routeParams','$location', 'authentication','$uibModal' ]
	function navigationCtrl($routeParams,$location, authentication, $uibModal){
		var vm = this;
		vm.currentPath = $location.path();
		vm.returnPage = $location.search().page || '/';

		vm.isLoggedIn = authentication.isLoggedIn();
		vm.currentUser = authentication.currentUser();
		vm.data = {};

		vm.logout = function() {
			vm.isLoggedIn = false;
			authentication.logout();			
			$location.path(vm.returnPage);			
		};

		vm.popupAddLoc = function(){
			var uibModalInstance = $uibModal.open({
				templateUrl : '/locationModal/locationModal.view.html',
				controller: 'locationModalCtrl as vm',
				 // resolve:{
				 // 	locationData: function(){
				 // 		return {
				 // 				locationName: vm.data.name
				 // 			}
				 // 	}
				 // }
			});

			 uibModalInstance.result.then(function (data) {
			 	alert('hahahha');
			 	vm.data.push(data);
			 });
		};
	};
})();