(function() {

	angular.module('BuscaAtivaEscolar').controller('DashboardCtrl', function ($scope, MockData) {

		$scope.evolutionChart = MockData.evolutionChart;
		$scope.typesChart = MockData.typesChart;

	});

})();