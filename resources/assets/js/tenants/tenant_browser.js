(function() {

	angular.module('BuscaAtivaEscolar')
		.config(function($stateProvider) {
			$stateProvider.state('tenant_browser', {
				url: '/tenants',
				templateUrl: '/views/tenants/list.html',
				controller: 'TenantBrowserCtrl'
			})
		})
		.controller('TenantBrowserCtrl', function ($scope, $rootScope, Tenants, Identity) {

			$scope.identity = Identity;
			$scope.tenants = Tenants.all();

		});

})();