(function() {

	angular.module('BuscaAtivaEscolar')
		.config(function ($stateProvider) {
			$stateProvider.state('user_browser', {
				url: '/users',
				templateUrl: '/views/users/browser.html',
				controller: 'UserBrowserCtrl'
			})
		})
		.controller('UserBrowserCtrl', function ($scope, $rootScope, Identity, Users, Groups, Tenants, StaticData) {

		$scope.identity = Identity;
		$scope.query = {
			tenant_id: null,
			group_id: null,
			type: null,
			email: null,
			max: 128,
		};

		$scope.setMaxResults = function(max) {
			$scope.query.max = max;
			$scope.refresh();
		};

		$scope.canFilterByTenant = (Identity.getType() === 'gestor_nacional' || Identity.getType() === 'superuser');

		$scope.static = StaticData;
		$scope.tenants = Tenants.find();
		$scope.groups = Groups.find();

		$scope.checkboxes = {};
		$scope.search = {};

		$scope.refresh = function() {
			$scope.search = Users.search($scope.query);
		};

		$scope.refresh();



	});

})();