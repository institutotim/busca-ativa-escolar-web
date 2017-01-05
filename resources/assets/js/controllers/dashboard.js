(function() {

	angular.module('BuscaAtivaEscolar').controller('DashboardCtrl', function ($scope, $rootScope, $location, MockData, Identity) {

		if(!Identity.isLoggedIn()) $location.path('/login');

		$rootScope.section = 'dashboard';
		$scope.identity = Identity;
		$scope.mockData = MockData;

		$scope.evolutionChart = MockData.evolutionChart;
		$scope.typesChart = MockData.typesChart;
		$scope.caseTypesChart = MockData.caseTypesChart;
		$scope.casesTimelineChart = MockData.generateCasesTimelineChart();

	});

})();