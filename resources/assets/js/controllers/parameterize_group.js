(function() {

	angular.module('BuscaAtivaEscolar').controller('ParameterizeGroupCtrl', function ($scope, $rootScope, MockData, Identity) {

		$rootScope.section = 'settings';
		$scope.identity = Identity;

		$scope.reasons = MockData.alertReasons;

	});

})();