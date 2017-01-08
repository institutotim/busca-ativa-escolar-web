(function() {

	angular.module('BuscaAtivaEscolar')
		.config(function ($stateProvider) {
			$stateProvider.state('child_create_from_alert', {
				url: '/children/create_alert',
				templateUrl: '/views/children/create_alert.html',
				controller: 'CreateAlertCtrl'
			})
		})
		.controller('CreateAlertCtrl', function ($scope, $rootScope, MockData, Identity) {

			$rootScope.section = 'dashboard';

			$scope.identity = Identity;
			$scope.reasons = MockData.alertReasons;

		});

})();