(function() {

	angular.module('BuscaAtivaEscolar').controller('DashboardCtrl', function ($scope, $rootScope, MockData, Identity) {

		$rootScope.section = 'dashboard';
		$scope.identity = Identity;
		$scope.evolutionChart = MockData.evolutionChart;
		$scope.typesChart = MockData.typesChart;

	});

})();