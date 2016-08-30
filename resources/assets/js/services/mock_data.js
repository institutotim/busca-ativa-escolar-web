(function() {

	angular.module('BuscaAtivaEscolar').factory('MockData', function () {

		return {

			alertReasons: [
				"Adolescente em conflito com a lei",
				"Criança e adolescente em abrigos ou em situação de rua",
				"Criança ou adolescente com deficiência(s)",
				"Criança ou adolescente com doença(s) que impeça(m) ou dificulte(m) a frequência à escola",
				"Criança ou adolescente vítima de abuso / violência sexual",
				"Evasão porque sente a escola desinteressante",
				"Falta de documentação da criança ou adolescente",
				"Falta de infraestrutura escolar",
				"Falta de transporte escolar",
				"Gravidez na adolescência",
				"Racismo",
				"Trabalho infantil",
				"Violência familiar",
				"Violência na escola"
			],

			typesChart: {
				type: "PieChart",
				data: {
					"cols": [
						{id: "t", label: "Tipo de caso", type: "string"},
						{id: "s", label: "Casos em aberto", type: "number"}
					], "rows": [
						{
							c: [
								{v: "Trabalho infantil"},
								{v: 250},
							]
						},
						{
							c: [
								{v: "Abuso sexual"},
								{v: 40}
							]
						},
						{
							c: [
								{v: "Falta de transporte"},
								{v: 50},
							]
						},
						{
							c: [
								{v: "Outros"},
								{v: 120},
							]
						}
					]
				}
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
						label: "Em aberto",
						type: "number"
					}, {
						id: "pending-cases",
						label: "Em progresso",
						type: "number"
					}, {
						id: "closed-cases",
						label: "Encerrados",
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