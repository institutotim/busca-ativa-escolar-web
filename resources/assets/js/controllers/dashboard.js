(function() {

	angular.module('BuscaAtivaEscolar').controller('DashboardCtrl', function ($scope, MockData, Identity) {

		$scope.identity = Identity;
		$scope.evolutionChart = MockData.evolutionChart;
		$scope.typesChart = MockData.typesChart;

	});

})();