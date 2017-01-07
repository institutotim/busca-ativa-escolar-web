(function() {

	angular.module('BuscaAtivaEscolar')
		.config(function ($stateProvider) {
			$stateProvider.state('case_create_from_alert', {
				url: '/cases/create_alert',
				templateUrl: '/views/cases/create_alert.html',
				controller: 'CreateAlertCtrl'
			})
		})
		.controller('CreateAlertCtrl', function ($scope, $rootScope, MockData, Identity) {

			$rootScope.section = 'dashboard';

			$scope.identity = Identity;
			$scope.reasons = MockData.alertReasons;

		});

})();