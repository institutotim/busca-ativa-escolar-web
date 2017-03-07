(function() {

	var app = angular.module('BuscaAtivaEscolar');

	app.service('Charts', function Charts(Utils) {

		function generateDimensionChart(report, seriesName, labels, yAxisLabel, valueSuffix) {

			console.log("[charts] Generating dimension chart: ", report, seriesName, labels, yAxisLabel, valueSuffix);

			if(!report || !seriesName || !labels) return;
			if(!yAxisLabel) yAxisLabel = 'Quantidade';
			if(!valueSuffix) valueSuffix = 'casos';

			var data = [];
			var categories = [];

			for(var i in report) {
				if(!report.hasOwnProperty(i)) continue;

				var category = (labels[i]) ? labels[i] : i;

				data.push( report[i] );
				categories.push( category );

			}

			return {
				options: {
					chart: {
						type: 'bar'
					},
					title: {
						text: ''
					},
					subtitle: {
						text: ''
					}
				},
				xAxis: {
					id: Utils.generateRandomID(),
					categories: categories,
					title: {
						text: null
					}
				},
				yAxis: {
					id: Utils.generateRandomID(),
					min: 0,
					title: {
						text: yAxisLabel,
						align: 'high'
					},
					labels: {
						overflow: 'justify'
					}
				},
				tooltip: {
					valueSuffix: ' ' + valueSuffix
				},
				plotOptions: {
					bar: {
						dataLabels: {
							enabled: true
						}
					}
				},
				legend: {
					layout: 'vertical',
					align: 'right',
					verticalAlign: 'top',
					x: -40,
					y: 80,
					floating: true,
					borderWidth: 1,
					backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
					shadow: true
				},
				credits: {
					enabled: false
				},
				series: [
					{
						id: Utils.generateRandomID(),
						name: seriesName,
						data: data
					}
				]
			};
		}

		function generateTimelineChart(report, chartName, labels) {

			console.log("[charts] Generating timeline chart: ", report, chartName, labels);

			if(!report || !chartName || !labels) return;

			var series = [];
			var categories = [];
			var data = {};
			var dates = Object.keys(report);

			// Translates ￿date -> metric to metric -> date; prepares list of categories
			for(var date in report) {
				if(!report.hasOwnProperty(date)) continue;

				for(var metric in report[date]) {
					if(!report[date].hasOwnProperty(metric)) continue;

					if(!data[metric]) data[metric] = {};
					data[metric][date] = report[date][metric];

					if(categories.indexOf(date) === -1) {
						categories.push(date);
					}
				}
			}

			// Builds series array
			for(var m in data) {
				if(!data.hasOwnProperty(m)) continue;

				var metricData = [];

				// Ensure even metrics with incomplete data (missing dates) show up accurately
				for(var i in dates) {
					if(!dates.hasOwnProperty(i)) continue;
					metricData.push( (data[m][dates[i]]) ? data[m][dates[i]] : null );
				}

				series.push({
					name: labels[m] ? labels[m] : m,
					data: metricData
				});
			}


			return {
				options: {
					chart: {
						type: 'line'
					},

					xAxis: {
						categories: categories,
						allowDecimals: false
					},

					yAxis: {
						title: {text: chartName}
					}
				},
				series: series,
				title: {
					text: ''
				},

				loading: false
			};
		}

		return {
			generateDimensionChart: generateDimensionChart,
			generateTimelineChart: generateTimelineChart
		};

	});

})();