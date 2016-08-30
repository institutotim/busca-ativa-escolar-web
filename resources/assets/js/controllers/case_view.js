(function() {

	angular.module('BuscaAtivaEscolar').controller('CaseViewCtrl', function ($scope, $rootScope, MockData, Identity) {

		$rootScope.section = 'cases';
		$scope.identity = Identity;
		$scope.reasons = MockData.alertReasons;

	});

})();