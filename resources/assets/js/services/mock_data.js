(function() {

	angular.module('BuscaAtivaEscolar').factory('MockData', function () {

		var alertReasons = [
			"Adolescente em conflito com a lei",
			"Criança ou adolescente com deficiência(s)",
			"Criança ou adolescente com doença(s) que impeça(m) ou dificulte(m) a frequência à escola",
			"Criança ou adolescente em abrigo",
			"Criança ou adolescente em situação de rua",
			"Criança ou adolescente vítima de abuso / violência sexual",
			"Evasão porque sente a escola desinteressante",
			"Falta de documentação da criança ou adolescente",
			"Falta de infraestrutura escolar",
			"Falta de transporte escolar",
			"Gravidez na adolescência",
			"Preconceito ou discriminação racial",
			"Trabalho infantil",
			"Violência familiar",
			"Violência na escola"
		];

		var states = [
			{id: 'SP', name: 'São Paulo'},
			{id: 'MG', name: 'Minas Gerais'},
			{id: 'RJ', name: 'Rio de Janeiro'},
			{id: 'DF', name: 'Distrito Federal'}
		];

		var cities = [
			{id: 1, state: 'SP', name: 'São Paulo'},
			{id: 2, state: 'SP', name: 'Campinas'},
			{id: 3, state: 'MG', name: 'Belo Horizonte'},
			{id: 4, state: 'RJ', name: 'Rio de Janeiro'},
			{id: 5, state: 'DF', name: 'Brasília'}
		];

		var groups = [
			{id: 1, name: 'Secretaria de Segurança Pública'},
			{id: 2, name: 'Secretaria da Educação'},
			{id: 3, name: 'Secretaria do Verde e Meio Ambiente'},
			{id: 4, name: 'Secretaria dos Transportes'}
		];

		return {

			alertReasons: alertReasons,

			states: states,
			cities: cities,
			groups: groups,

			caseTypesChart: {
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
					categories: alertReasons,
					title: {
						text: null
					}
				},
				yAxis: {
					min: 0,
					title: {
						text: 'Quantidade de casos',
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
						name: 'Alertas realizados',
						data: [105, 95, 42, 74, 38, 10, 12, 50, 70, 60, 40, 122, 78, 47]
					},
					{
						name: 'Crianças (re)matriculadas',
						data: [107, 31, 63, 20, 2, 50, 74, 38, 10, 12, 5, 10, 6, 40]
					},
					{
						name: 'Crianças dentro da escola consolidadas',
						data: [50, 20, 10, 25, 212, 40, 91, 12, 16, 20, 22, 21, 20, 23]
					},
					{
						name: 'Casos em andamento',
						data: [13, 15, 94, 40, 6, 5, 8, 3, 9, 10, 12, 4, 5, 1]
					}
				]
			},

			evolutionChart: {
				type: 'LineChart',
				options: {
					"colors": ['#0000FF', '#009900', '#CC0000', '#DD9900'],
					"defaultColors": ['#0000FF', '#009900', '#CC0000', '#DD9900'],
					"isStacked": "true",
					"fill": 20,
					"displayExactValues": true,
					"vAxis": {
						"title": "Casos",
						"gridlines": {
							"count": 10
						}
					},
					"hAxis": {
						"title": "Período"
					}
				},
				data: {
					"cols": [{
						id: "period",
						label: "Período",
						type: "string"
					}, {
						id: "open-cases",
						label: "Alertas realizados",
						type: "number"
					}, {
						id: "pending-cases",
						label: "Casos em andamento",
						type: "number"
					}, {
						id: "closed-cases",
						label: "Crianças (re)matriculadas",
						type: "number"
					}],
					"rows": [{
						c: [{
							v: "Primeira semana"
						}, {
							v: 100
						}, {
							v: 15
						}, {
							v: 50
						}]
					}, {
						c: [{
							v: "Segunda semana"
						}, {
							v: 80
						}, {
							v: 20
						}, {
							v: 60
						}]

					}, {
						c: [{
							v: "Terceira semana"
						}, {
							v: 60
						}, {
							v: 30
						}, {
							v: 120
						}]
					}, {
						c: [{
							v: "Quarta semana"
						}, {
							v: 75
						}, {
							v: 25
						}, {
							v: 160
						}]
					}]
				}
			}
		}

	});

})();