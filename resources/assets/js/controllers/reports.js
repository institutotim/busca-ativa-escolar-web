(function() {

	angular.module('BuscaAtivaEscolar').controller('ReportsCtrl', function ($scope, $rootScope, MockData, Identity) {

		$rootScope.section = 'reports';
		$scope.identity = Identity;

		$scope.brazilMapSettings = MockData.brazilMapSettings;
		$scope.caseTypesChart = MockData.caseTypesChart;
		$scope.casesTimelineChart = MockData.generateCasesTimelineChart();

	});

})();