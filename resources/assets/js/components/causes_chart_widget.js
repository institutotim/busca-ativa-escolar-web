(function() {

	angular.module('BuscaAtivaEscolar').directive('causesChart', function (moment, Platform, Reports, Charts) {

		function init(scope, element, attrs) {

			var causesData = {};
			var causesChart = {};
			var causesReady = false;

			var isReady = false;
			var hasEnoughData = false;

			scope.getCausesConfig = getCausesConfig;

			scope.isReady = function() {
				return isReady;
			};

			scope.hasEnoughData = function() {
				return hasEnoughData;
			};

			function fetchCausesData() {
				return Reports.query({
					view: 'linear',
					entity: 'children',
					dimension: 'alert_cause_id',
					filters: {
						case_status: ['in_progress', 'completed', 'interrupted'],
						alert_status: ['accepted']
					}
				}, function (data) {
					causesData = data;
					causesChart = getCausesChart();
					causesReady = true;

					isReady = true;
					hasEnoughData = (
						causesData &&
						causesData.response &&
						!angular.equals({}, causesData.response.report)
					);
				});
			}

			function getCausesChart() {
				var report = causesData.response.report;
				var chartName = 'Divisão dos casos por causa de evasão escolar';
				var labels = causesData.labels ? causesData.labels : {};

				return Charts.generateDimensionChart(report, chartName, labels, 'pie');
			}

			function getCausesConfig() {
				if(!causesReady) return;
				return causesChart;
			}

			Platform.whenReady(function () {
				fetchCausesData();
			});
		}

		return {
			link: init,
			replace: true,
			templateUrl: '/views/components/causes_chart.html'
		};
	});

})();