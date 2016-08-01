(function(){
	angular.module('loc8rApp')
		.controller('registerCtrl', registerCtrl);

	registerCtrl.$inject = ['$location', 'authentication'];
	function registerCtrl($location, authentication){
		var vm = this;

		vm.pageHeader = {
			title: '注册页面'
		};

		vm.credentials = {
			email: '',
			name: '',
			password: ''
		};

		vm.returnPage = $location.search().page || '/';

		vm.onSubmit = function(){
			vm.formError = "";
			if(!vm.credentials.name || !vm.credentials.email || !vm.credentials.password) {
				vm.formError = "请补全必填项";
				return false;
			} else {
				vm.doRegister();
			}
		};

		vm.doRegister = function(){
			vm.formError = "";

			authentication
				.register(vm.credentials)
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