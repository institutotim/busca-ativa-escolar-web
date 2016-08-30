(function() {
	angular
		.module('BuscaAtivaEscolar', [

			'ngRoute',
			'googlechart',
			'ui.bootstrap'
		])

		.run(function() {
			$.material.init();
		})

		.config(['$routeProvider', function($routeProvider) {

			var NC = (new Date()).getTime();

			$routeProvider.
				when('/dashboard', {
					templateUrl: 'dashboard.html?NC=' + NC,
					controller: 'DashboardCtrl'
				}).
				when('/cases', {
					templateUrl: 'cases/list.html?NC=' + NC,
					controller: 'CasesCtrl'
				}).
				otherwise({
					redirectTo: '/dashboard'
				});
		}]);
})();
(function() {

	angular.module('BuscaAtivaEscolar').directive('appNavbar', function (Identity) {

		function init(scope, element, attrs) {
			scope.identity = Identity;
			scope.cityName = 'São Paulo';
			scope.user = {
				name: 'Aryel Tupinambá',
				type: 'Coordenador Operacional'
			};
		}

		return {
			link: init,
			templateUrl: 'navbar.html'
		};
	});

})();
(function() {

	angular.module('BuscaAtivaEscolar').controller('CasesCtrl', function ($scope, MockData, Identity) {

		$scope.identity = Identity;

		$scope.range = function (start, end) {
			var arr = [];

			for(var i = start; i <= end; i++) {
				arr.push(i);
			}

			return arr;
		}

	});

})();
(function() {

	angular.module('BuscaAtivaEscolar').controller('DashboardCtrl', function ($scope, MockData, Identity) {

		$scope.identity = Identity;
		$scope.evolutionChart = MockData.evolutionChart;
		$scope.typesChart = MockData.typesChart;

	});

})();
(function() {

	angular.module('BuscaAtivaEscolar').service('Identity', function () {

		var mockUsers = {
			'agente_comunitario': {name: 'Mary Smith', type: 'Agente Comunitário', can: ['dashboard']},
			'tecnico_verificador': {name: 'Paul Atree', type: 'Técnico Verificador', can: ['dashboard','cases']},
			'supervisor_institucional': {name: 'John Doe', type: 'Supervisor Institucional', can: ['dashboard','cases','reports']},
			'coordenador_operacional': {name: 'Aryel Tupinambá', type: 'Coordenador Operacional', can: ['dashboard','cases','reports','users','settings']},
			'gestor_politico': {name: 'João das Neves', type: 'Gestor Político', can: ['dashboard','reports','users','settings']},
			'super_administrador': {name: 'Morgan Freeman', type: 'Super Administrador', can: ['dashboard','reports','cities','users','settings']}
		};

		var currentType = 'coordenador_operacional';
		var currentUser = mockUsers[currentType];

		function getCurrentUser() {
			return currentUser;
		}

		function can(operation) {
			if(!currentUser) return false;
			return getCurrentUser().can.indexOf(operation) !== -1;
		}

		function getType() {
			return currentType;
		}

		function setUserType(type) {
			currentType = type;
			currentUser = mockUsers[type];
		}

		return {
			getCurrentUser: getCurrentUser,
			getType: getType,
			can: can,
			setUserType: setUserType
		}

	});

})();
(function() {

	angular.module('BuscaAtivaEscolar').factory('MockData', function () {

		return {
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
//# sourceMappingURL=app.js.map
