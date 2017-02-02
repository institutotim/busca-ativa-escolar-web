(function() {

	angular.module('BuscaAtivaEscolar')
		.config(function($stateProvider) {
			$stateProvider.state('reports', {
				url: '/reports',
				templateUrl: '/views/reports/reports.html',
				controller: 'ReportViewerCtrl'
			})
		})
		.controller('ReportViewerCtrl', function ($scope, $rootScope, StaticData, Reports, Identity) {

		$scope.identity = Identity;
		$scope.static = StaticData;

		$scope.values = {
			child_status: ['out_of_school', 'in_observation', 'in_school'],
			deadline_status: ['normal', 'delayed'],
			current_step_type: [
				'BuscaAtivaEscolar\\CaseSteps\\Alerta',
				'BuscaAtivaEscolar\\CaseSteps\\Pesquisa',
				'BuscaAtivaEscolar\\CaseSteps\\AnaliseTecnica',
				'BuscaAtivaEscolar\\CaseSteps\\GestaoDoCaso',
				'BuscaAtivaEscolar\\CaseSteps\\Rematricula',
				'BuscaAtivaEscolar\\CaseSteps\\Observacao',
			],
			work_activity: Object.keys(StaticData.getWorkActivities()),
			case_cause_ids: Object.keys(StaticData.getCaseCauses()),
			alert_cause_id: Object.keys(StaticData.getAlertCauses()),
		};

		$scope.labels = {
			child_status: {out_of_school: 'Fora da Escola' , in_observation: 'Em observacao', in_school: 'Dentro da Escola'},
			deadline_status: {normal: 'Normal', delayed: 'Em atraso'},
			current_step_type: {
				'BuscaAtivaEscolar\\CaseSteps\\Alerta': 'Alerta',
				'BuscaAtivaEscolar\\CaseSteps\\Pesquisa': 'Pesquisa',
				'BuscaAtivaEscolar\\CaseSteps\\AnaliseTecnica': 'Analise tecnica',
				'BuscaAtivaEscolar\\CaseSteps\\GestaoDoCaso': 'Gestao do caso',
				'BuscaAtivaEscolar\\CaseSteps\\Rematricula': 'Rematricula',
				'BuscaAtivaEscolar\\CaseSteps\\Observacao': 'Observacao',
			},
			work_activity: StaticData.getWorkActivities(),
			case_cause_ids: StaticData.getCaseCauses(),
			alert_cause_id: StaticData.getAlertCauses(),
			gender: StaticData.getGenders()
		};

		$scope.entities = {
			children: {
				id: 'children',
				name: 'Crianças e adolescentes',
				value: 'num_children',
				entity: 'children',
				//dimensions: ['child_status', 'deadline_status', 'case_step', 'age', 'gender', 'parents_income', 'place_kind', 'work_activity', 'case_cause_ids'],
				dimensions: ['child_status', 'current_step_type', 'age', 'gender', 'parents_income', 'place_kind', 'work_activity', 'case_cause_ids', 'place_uf', 'school_last_id'],
				filters: ['age', 'gender', 'ethnicity', 'parents_income', 'parent_scholarity', 'work_activity', 'place_kind', 'case_step', 'uf', 'city', 'child_status', 'deadline_status', 'cause'],
				views: ['chart', 'list']//['map', 'chart', 'timeline', 'list']
			}/*,
			alerts: {
				id: 'alerts',
				name: 'Alertas',
				value: 'num_alerts',
				dimensions: ['alert_status', 'deadline_status', 'alert_cause_id'],
				filters: ['age', 'gender', 'assigned_user', 'uf', 'city', 'alert_status', 'child_status', 'deadline_status'],
				views: ['map', 'chart', 'timeline', 'list']
			},
			users: {
				id: 'users',
				name: 'Usuários',
				value: 'num_assignments',
				dimensions: ['child_status', 'deadline_status', 'case_step'],
				filters: ['child_status', 'deadline_status', 'case_step', 'user_group', 'user_type'],
				views: ['chart', 'timeline', 'list']
			}*/
		};

		$scope.views = {
			map: {id: 'map', name: 'Mapa', allowsDimension: false, viewMode: 'linear'},
			chart: {id: 'chart', name: 'Gráfico', allowsDimension: true, viewMode: 'linear'},
			timeline: {id: 'timeline', name: 'Linha do tempo', allowsDimension: true, viewMode: 'time_series'},
			list: {id: 'list', name: 'Lista', allowsDimension: true, viewMode: 'linear'}
		};

		$scope.values = {
			num_children: 'Número de crianças e adolescentes',
			num_alerts: 'Número de alertas',
			num_assignments: 'Número de casos sob sua responsabilidade'
		};

		$scope.fields = {
			child_status: 'Status da criança',
			deadline_status: 'Status do andamento',
			alert_status: 'Status do alerta',
			current_step_type: 'Etapa do caso',
			age: 'Faixa etária',
			gender: 'Sexo',
			parents_income: 'Faixa de renda familiar',
			place_kind: 'Região',
			work_activity: 'Atividade econômica',
			case_cause_ids: 'Causa do Caso',
			alert_cause_id: 'Causa do Alerta',
			user_group: 'Grupo do usuário',
			user_type: 'Tipo do usuário',
			assigned_user: 'Usuário responsável',
			parent_scholarity: 'Escolaridade do responsável',
			place_uf: 'Estado',
			school_last_id: 'Última escola que frequentou',
			city: 'Município',
		};

		$scope.current = {
			entity: 'children',
			dimension: 'cause',
			view: 'chart'
		};

		$scope.chartConfig = getChartConfig();
		$scope.reportData = {};

		$scope.onParametersUpdate = function() {

			// Check if selected view is available in entity
			if($scope.entities[$scope.current.entity].views.indexOf($scope.current.view) === -1) {
				$scope.current.view = $scope.current.entity.views[0];
			}

			// Check if selected dimension is available in entity
			var availableDimensions = $scope.entities[$scope.current.entity].dimensions;
			if(availableDimensions.indexOf($scope.current.dimension) === -1) {
				$scope.current.dimension = availableDimensions[0];
			}

			fetchReportData().then(function (res) {

				if($scope.current.view !== "list") {
					$scope.chartConfig = getChartConfig();
				}

			});

		};

		$scope.onParametersUpdate();

		function fetchReportData() {

			var params = Object.assign({}, $scope.current);
			params.view = $scope.views[$scope.current.view].viewMode;

			$scope.reportData = Reports.query(params);

			return $scope.reportData.$promise;
		}

		$scope.generateRandomNumber = function(min, max) {
			return min + Math.floor( Math.random() * (max - min));
		};

		$scope.canFilterBy = function(filter_id) {
			return $scope.entities[$scope.current.entity].filters.indexOf(filter_id) !== -1;
		};

		function getChartConfig() {
			if($scope.current.view === "chart") return generateDimensionChart($scope.current.entity, $scope.current.dimension);
			if($scope.current.view === "timeline") return generateTimelineChart($scope.current.entity, $scope.current.dimension);
			//if($scope.current.view.id == "map") return MockData.brazilMapSettings;
			return {};
		}

		function generateDimensionChart(entity, dimension) {

			console.log("[report.charts] Generating dimension chart: ", entity, dimension, $scope.reportData);

			if(!$scope.reportData) return;
			if(!$scope.reportData.$resolved) return;
			if(!$scope.reportData.response) return;
			if(!$scope.reportData.response.report) return;

			var report = $scope.reportData.response.report;
			var seriesName = $scope.values[$scope.entities[entity].value];

			var data = [];
			var categories = [];

			for(var i in report) {
				if(!report.hasOwnProperty(i)) continue;

				var category = ($scope.labels[dimension] && $scope.labels[dimension][i]) ? $scope.labels[dimension][i] : i;

				data.push( report[i] );
				categories.push( category );

			}

			console.log("[report.charts] Rendering: ", seriesName, data, categories);

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
					categories: categories,
					title: {
						text: null
					}
				},
				yAxis: {
					min: 0,
					title: {
						text: 'Quantidade',
						align: 'high'
					},
					labels: {
						overflow: 'justify'
					}
				},
				tooltip: {
					valueSuffix: ' casos'
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
						name: seriesName,
						data: data
					}
				]
			};
		}

		function generateTimelineChart(entity, dimension, numDays) {

			return;

			if(!numDays) numDays = 30;
			var series = [];

			for(var d in dimension.values) {
				if(!dimension.values.hasOwnProperty(d)) continue;

				series.push({
					name: dimension.values[d],
					data: []
				});
			}

			var settings = {
				options: {
					chart: {
						type: 'line'
					},

					xAxis: {
						currentMin: 1,
						currentMax: 30,
						title: {text: 'Últimos ' + numDays + ' dias'},
						allowDecimals: false
					},

					yAxis: {
						title: {text: $scope.values[entity.value]}
					}
				},
				series: series,
				title: {
					text: ''
				},

				loading: false
			};

			for(var i = 0; i < numDays; i++) {
				for(var j in series) {
					if(!series.hasOwnProperty(j)) continue;
					settings.series[j].data.push(Math.floor(100 + (j * 15) + (Math.random() * (numDays / 2))));
				}
			}

			return settings;
		}

	});

})();