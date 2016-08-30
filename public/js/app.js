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
					controller: 'CaseSearchCtrl'
				}).
				when('/cases/create_alert', {
					templateUrl: 'cases/create_alert.html?NC=' + NC,
					controller: 'CreateAlertCtrl'
				}).
				when('/cases/:case_id', {
					templateUrl: 'cases/view.html?NC=' + NC,
					controller: 'CaseViewCtrl'
				}).
				when('/users', {
					templateUrl: 'users/list.html?NC=' + NC,
					controller: 'UserSearchCtrl'
				}).
				when('/users/:user_id', {
					templateUrl: 'users/view.html?NC=' + NC,
					controller: 'UserViewCtrl'
				}).
				when('/cities', {
					templateUrl: 'cities/list.html?NC=' + NC,
					controller: 'CitySearchCtrl'
				}).
				when('/settings', {
					templateUrl: 'settings/manage_settings.html?NC=' + NC,
					controller: 'SettingsCtrl'
				}).
				when('/settings/parameterize_group/:group_id', {
					templateUrl: 'settings/parameterize_group.html?NC=' + NC,
					controller: 'ParameterizeGroupCtrl'
				}).
				when('/reports', {
					templateUrl: 'reports/home.html?NC=' + NC,
					controller: 'ReportsCtrl'
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

	angular.module('BuscaAtivaEscolar').controller('CaseSearchCtrl', function ($scope, $rootScope, MockData, Identity) {

		$rootScope.section = 'cases';
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

	angular.module('BuscaAtivaEscolar').controller('CaseViewCtrl', function ($scope, $rootScope, MockData, Identity) {

		$rootScope.section = 'cases';

		$scope.identity = Identity;
		$scope.reasons = MockData.alertReasons;

		$scope.isPanelOpen = {};
		$scope.currentStep = null;
		$scope.currentForm = null;
		$scope.message = "";
		$scope.messages = [];

		$scope.steps = {
			'pesquisa': {id: 'pesquisa', name: 'Pesquisa', opens: ['info', 'location']},
			'parecer': {id: 'parecer', name: 'Parecer', opens: ['parecer']},
			'consolidacao': {id: 'consolidacao', name: 'Consolidação'},
			'reinsercao': {id: 'reinsercao', name: 'Reinserção'},
			'1obs': {id: '1obs', name: '1a observação'},
			'2obs': {id: '2obs', name: '2a observação'},
			'3obs': {id: '3obs', name: '3a observação'},
			'4obs': {id: '4obs', name: '4a observação'}
		};

		function init() {
			$scope.setCaseStep('pesquisa');
			$scope.openForm('pesquisa');
		}

		$scope.setCaseStep = function(step) {
			$scope.currentStep = step;
			$scope.isPanelOpen = {};

			for(var i in $scope.steps[step].opens) {
				$scope.isPanelOpen[$scope.steps[step].opens[i]] = true;
			}
		};

		$scope.sendMessage = function () {
			$scope.messages.push({
				user: Identity.getCurrentUser(),
				body: $scope.message
			});

			$scope.message = "";
		};

		$scope.openForm = function(form) {

			if(form != 'consolidada' && !$scope.isPastStep(form)) {
				alert("Etapa ainda não liberada!");
				return;
			}

			$scope.currentForm = form;
			$scope.isPanelOpen = {};

			if(form == 'consolidada') {
				$scope.isPanelOpen = {info: true, location: true, parecer: true};
				return;
			}

			for(var i in $scope.steps[form].opens) {
				$scope.isPanelOpen[$scope.steps[form].opens[i]] = true;
			}
		};

		$scope.togglePanel = function(panel) {
			$scope.isPanelOpen[panel] = !$scope.isPanelOpen[panel];
		};

		$scope.isOpen = function(panel) {
			return $scope.isPanelOpen[panel] || false;
		};

		$scope.getFormName = function() {
			if($scope.currentForm == "consolidada") return "com dados consolidados";
			return "na etapa " + $scope.steps[$scope.currentForm].name;
		};

		$scope.isPastStep = function(step) {
			if($scope.currentStep == step) return true;

			for(var i in $scope.steps) {
				if($scope.steps[i].id == step) return true;
				if($scope.steps[i].id == $scope.currentStep) return false;
			}
		};

		$scope.getCaseTimelineClass = function(step) {
			if($scope.currentStep == step) return 'btn-info';

			for(var i in $scope.steps) {
				if($scope.steps[i].id == step) return 'btn-success';
				if($scope.steps[i].id == $scope.currentStep) return 'btn-default';
			}
		};

		init();

	});

})();
(function() {

	angular.module('BuscaAtivaEscolar').controller('CitySearchCtrl', function ($scope, $rootScope, MockData, Identity) {

		$rootScope.section = 'cities';
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

	angular.module('BuscaAtivaEscolar').controller('CreateAlertCtrl', function ($scope, $rootScope, MockData, Identity) {

		$rootScope.section = 'dashboard';

		$scope.identity = Identity;
		$scope.reasons = MockData.alertReasons;

	});

})();
(function() {

	angular.module('BuscaAtivaEscolar').controller('DashboardCtrl', function ($scope, $rootScope, MockData, Identity) {

		$rootScope.section = 'dashboard';
		$scope.identity = Identity;
		$scope.evolutionChart = MockData.evolutionChart;
		$scope.typesChart = MockData.typesChart;

	});

})();
(function() {

	angular.module('BuscaAtivaEscolar').controller('ParameterizeGroupCtrl', function ($scope, $rootScope, MockData, Identity) {

		$rootScope.section = 'settings';
		$scope.identity = Identity;

		$scope.reasons = MockData.alertReasons;

	});

})();
(function() {

	angular.module('BuscaAtivaEscolar').controller('ReportsCtrl', function ($scope, $rootScope, MockData, Identity) {

		$rootScope.section = 'reports';
		$scope.identity = Identity;

	});

})();
(function() {

	angular.module('BuscaAtivaEscolar').controller('SettingsCtrl', function ($scope, $rootScope, MockData, Identity) {

		$rootScope.section = 'settings';
		$scope.identity = Identity;

	});

})();
(function() {

	angular.module('BuscaAtivaEscolar').controller('UserSearchCtrl', function ($scope, $rootScope, MockData, Identity) {

		$rootScope.section = 'users';
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
//# sourceMappingURL=app.js.map
