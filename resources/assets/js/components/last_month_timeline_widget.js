(function() {

	angular.module('BuscaAtivaEscolar').directive('lastMonthTimeline', function ($timeout, moment, Platform, Reports, Charts) {

		function init(scope, element, attrs) {

			var timelineData = {};
			var timelineChart = {};
			var timelineReady = false;

			var isReady = false;
			var hasEnoughData = false;

			scope.getTimelineConfig = getTimelineConfig;

			scope.isReady = function() {
				return isReady;
			};

			scope.hasEnoughData = function() {
				return hasEnoughData;
			};

			function fetchTimelineData() {
				var lastMonth = moment().subtract(30, 'days').format('YYYY-MM-DD');
				var today = moment().format('YYYY-MM-DD');

				return Reports.query({
					view: 'time_series',
					entity: 'children',
					dimension: 'child_status',
					filters: {
						date: {from: lastMonth, to: today},
						case_status: ['in_progress', 'completed', 'interrupted'],
						alert_status: ['accepted']
					}
				}, function (data) {
					timelineData = data;
					timelineChart = getTimelineChart();
					timelineReady = true;

					isReady = true;
					hasEnoughData = (
						timelineData &&
						timelineData.response &&
						timelineData.response.report.length &&
						timelineData.response.report.length > 0
					);

					$timeout(function() {
						scope.$broadcast('highchartsng.reflow');
					}, 500);
				});
			}

			function getTimelineChart() {
				var report = timelineData.response.report;
				var chartName = 'Evolução do status dos casos nos últimos 30 dias';
				var labels = timelineData.labels ? timelineData.labels : {};

				return Charts.generateTimelineChart(report, chartName, labels);

			}

			function getTimelineConfig() {
				if(!timelineReady) return;
				return timelineChart;
			}

			Platform.whenReady(function () {
				fetchTimelineData();
			});
		}

		return {
			link: init,
			replace: true,
			templateUrl: '/views/components/last_month_timeline.html'
		};
	});

})();