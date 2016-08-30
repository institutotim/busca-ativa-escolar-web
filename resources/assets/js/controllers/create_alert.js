(function() {

	angular.module('BuscaAtivaEscolar').controller('CreateAlertCtrl', function ($scope, $rootScope, MockData, Identity) {

		$rootScope.section = 'dashboard';

		$scope.identity = Identity;
		$scope.reasons = MockData.alertReasons;

	});

})();