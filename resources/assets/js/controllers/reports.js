(function() {

	angular.module('BuscaAtivaEscolar').controller('ReportsCtrl', function ($scope, $rootScope, MockData, Identity) {

		$rootScope.section = 'reports';
		$scope.identity = Identity;

	});

})();