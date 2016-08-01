(function(){
	angular.module('loc8rApp')
		.controller('loginCtrl', loginCtrl);

	loginCtrl.$inject = ['$location', 'authentication'];
	function loginCtrl($location, authentication){
		var vm = this;

		vm.pageHeader = {
			title: '登录页面'
		};

		vm.credentials = {
			name: '',
			password: ''
		};

		vm.returnPage = $location.search().page || '/';

		vm.onSubmit = function(){
			vm.formError = "";
			if(!vm.credentials.email ||  !vm.credentials.password) {
				vm.formError = "请补全必填项";
				return false;
			} else {
				vm.doLogin();
			}
		};

		vm.doLogin = function(){
			vm.formError = "";

			authentication
				.login(vm.credentials)
				.error(function(err){
					vm.formError = err;
				})
				.then(function(){
					$location.search('page', null);
					$location.path(vm.returnPage);
				});
		};
	}
})();