( function(){
	angular.module('loc8rApp')
		.controller('aboutCtrl',aboutCtrl);

	function aboutCtrl(){
		var vm = this;

		vm.pageHeader = { title: '关于找WIFI' };
		vm.main = {content: '如果你正在路上，同时还有一些工作需要完成，你需要一个地方坐下休息，享受优质的服务和环境，同时提供稳定的WIFI助你完成工作，那么找WIFI就是你正需要的东西。\n \n 本网页由Elodie Wu提供，感谢Huahouye同学的悉心指导。'}
	}
})();