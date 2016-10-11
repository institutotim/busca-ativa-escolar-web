(function() {
	angular
		.module('BuscaAtivaEscolar', [

			'ngRoute',
			'ngToast',
			'ngAnimate',

			'googlechart',
			'highcharts-ng',

			'ui.bootstrap',
			'ui.select'
		])

		.run(function($rootScope, Identity) {

			$.material.init();

			Highcharts.setOptions({
				lang: {
					months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
					shortMonths: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
					weekdays: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
					loading: ['Atualizando o gráfico...'],
					contextButtonTitle: 'Exportar gráfico',
					decimalPoint: ',',
					thousandsSep: '.',
					downloadJPEG: 'Baixar imagem JPEG',
					downloadPDF: 'Baixar arquivo PDF',
					downloadPNG: 'Baixar imagem PNG',
					downloadSVG: 'Baixar vetor SVG',
					printChart: 'Imprimir gráfico',
					rangeSelectorFrom: 'De',
					rangeSelectorTo: 'Para',
					rangeSelectorZoom: 'Zoom',
					resetZoom: 'Voltar zoom',
					resetZoomTitle: 'Voltar zoom para nível 1:1'
				}
			});
		})

		.config(['ngToastProvider', function(ngToast) {
			ngToast.configure({
				verticalPosition: 'top',
				horizontalPosition: 'right',
				maxNumber: 3,
				animation: 'slide',
				dismissButton: true,
				timeout: 3000
			});
		}])

		.config(['$routeProvider', function($routeProvider) {

			var NC = (new Date()).getTime();

			$routeProvider.
				when('/dashboard', {
					templateUrl: 'dashboard.html?NC=' + NC,
					controller: 'DashboardCtrl'
				}).
				when('/preferences', {
					templateUrl: 'preferences/manage.html?NC=' + NC,
					controller: 'PreferencesCtrl'
				}).
				when('/developer_mode', {
					templateUrl: 'developer/developer_dashboard.html?NC=' + NC,
					controller: 'DeveloperCtrl'
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
					templateUrl: 'cases/view/main.html?NC=' + NC,
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
				when('/credits', {
					templateUrl: 'static/credits.html?NC=' + NC,
					controller: 'CreditsCtrl'
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
			scope.cityUF = 'SP';
			scope.showNotifications = true;

			scope.user = {
				name: 'Aryel Tupinambá',
				type: 'Coordenador Operacional'
			};

			scope.toggleNotifications = function($event) {
				scope.showNotifications = !scope.showNotifications;

				$event.stopPropagation();
				$event.stopImmediatePropagation();
				$event.preventDefault();

				return false;
			}
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

	angular.module('BuscaAtivaEscolar').controller('CaseViewCtrl', function ($scope, $rootScope, ngToast, Modals, MockData, Identity) {

		$rootScope.section = 'cases';

		$scope.identity = Identity;
		$scope.reasons = MockData.alertReasons;

		$scope.isPanelOpen = {};
		$scope.currentStep = null;
		$scope.currentForm = null;
		$scope.message = "";
		$scope.messages = [];

		$scope.steps = {
			'alerta': {id: 'alerta', name: 'Alerta', opens: ['info', 'parents'], next: 'pesquisa'},
			'pesquisa': {id: 'pesquisa', name: 'Pesquisa', opens: ['info', 'parents', 'location'], next: 'analise_tecnica'},
			'analise_tecnica': {id: 'analise_tecnica', name: 'Análise Técnica', opens: ['analise_tecnica'], next: 'consolidacao'},
			'consolidacao': {id: 'consolidacao', name: 'Consolidação', next: 'reinsercao'},
			'reinsercao': {id: 'reinsercao', name: 'Reinserção', next: '1obs'},
			'1obs': {id: '1obs', name: '1a observação', next: '2obs'},
			'2obs': {id: '2obs', name: '2a observação', next: '3obs'},
			'3obs': {id: '3obs', name: '3a observação', next: '4obs'},
			'4obs': {id: '4obs', name: '4a observação'}
		};

		function init() {
			$scope.setCaseStep('pesquisa', true);
			$scope.openForm('pesquisa');
		}

		$scope.hasNextStep = function() {
			if(!$scope.steps[$scope.currentStep]) return false;
			return !!$scope.steps[$scope.currentStep].next;
		};

		$scope.setCaseStep = function(step, skipNotification) {
			$scope.currentStep = step;
			$scope.isPanelOpen = {};

			for(var i in $scope.steps[step].opens) {
				$scope.isPanelOpen[$scope.steps[step].opens[i]] = true;
			}

			if(skipNotification) return;

			ngToast.create({
				className: 'success',
				content: 'Caso progredido para a etapa ' + $scope.steps[step].name
			});
		};

		$scope.sendMessage = function () {
			$scope.messages.push({
				user: Identity.getCurrentUser(),
				body: $scope.message
			});

			$scope.message = "";
		};

		$scope.sendToApp = function() {
			Modals.show(Modals.Alert(
				'Ficha enviada para seu dispositivo!',
				'Ela estará disponível na área de Notificações do aplicativo Busca Ativa Escolar'
			));
		};

		$scope.save = function() {
			ngToast.create({
				className: 'success',
				content: 'Dados salvos na ficha de ' + $scope.steps[$scope.currentStep].name
			});
		};

		$scope.saveAndProceed = function() {
			if(!$scope.hasNextStep()) return;

			Modals.show(Modals.Confirm('Tem certeza que deseja prosseguir de etapa?', 'Ao progredir de etapa, a etapa anterior será marcada como concluída.')).then(function () {
				var next = $scope.steps[$scope.currentStep].next;

				ngToast.create({
					className: 'success',
					content: 'Dados salvos na ficha de ' + $scope.steps[$scope.currentStep].name
				});

				$scope.setCaseStep(next);
				$scope.openForm(next);
			})

		};

		$scope.openForm = function(form) {

			if(form != 'consolidada' && !$scope.isPastStep(form)) {
				Modals.show(Modals.Alert('Etapa ainda não liberada!', 'Você deve completar a etapa anterior para que a ficha da nova etapa seja liberada.'));
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
			if($scope.currentForm == "consolidada") return "Dados consolidados";
			return $scope.steps[$scope.currentForm].name;
		};

		$scope.isPastStep = function(step, skipCurrentStep) {
			if($scope.currentStep == step) return !skipCurrentStep;

			for(var i in $scope.steps) {
				if($scope.steps[i].id == step) return true;
				if($scope.steps[i].id == $scope.currentStep) return false;
			}
		};

		$scope.getCaseTimelineClass = function(step) {
			if($scope.currentStep == step) return 'step-current';

			for(var i in $scope.steps) {
				if($scope.steps[i].id == step) return 'step-completed';
				if($scope.steps[i].id == $scope.currentStep) return 'step-pending';
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

	angular.module('BuscaAtivaEscolar').controller('CreditsCtrl', function ($scope, $rootScope, AppDependencies) {

		console.log("Displaying app dependencies: ", AppDependencies);

		$rootScope.section = 'credits';
		$scope.appDependencies = AppDependencies;

	});

})();
(function() {

	angular.module('BuscaAtivaEscolar').controller('DashboardCtrl', function ($scope, $rootScope, MockData, Identity) {

		$rootScope.section = 'dashboard';
		$scope.identity = Identity;
		$scope.evolutionChart = MockData.evolutionChart;
		$scope.typesChart = MockData.typesChart;
		$scope.caseTypesChart = MockData.caseTypesChart;

	});

})();
(function() {

	angular.module('BuscaAtivaEscolar').controller('DeveloperCtrl', function ($scope, $rootScope, Notifications) {

		var messages = [
			'asdasd asd as das das dsd fasdf as',
			'sdg sdf gfdgh dfthdfg hdfgh dfgh ',
			'rtye rtertg heriufh iurfaisug faisugf as',
			'ksjf hkdsuf oiaweua bfieubf iasuef iauegh',
			'jkb viubiurbviesubvisueb iseubv',
			'askjdfh aiufeiuab biausf biu iubfa iub fseiuse bfsaef'
		];

		$scope.testNotification = function (messageClass) {
			Notifications.push(messageClass, messages.clone().shuffle().pop())
		}

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

		$scope.cities = MockData.cities;
		$scope.states = MockData.states;
		$scope.groups = MockData.groups;

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

	angular
		.module('BuscaAtivaEscolar')
		.factory('AppDependencies', function() {
			return [
				["Back-end", "Laravel Framework",           "5.3",      "http://laravel.com", "MIT"],
				["Back-end", "PHP",                         "7.1",      "http://php.net", "PHP License 3.01"],
				["Back-end", "MariaDB",                     "10.0.20",  "http://mariadb.org", "GPLv2"],
				["Back-end", "memcached",                   "1.4.31",   "http://memcached.org", "BSD"],
				["Front-end", "AngularJS",                   "1.5.5",    "http://angularjs.org", "MIT"],
				["Front-end", "jQuery",                      "3.1.0",    "http://jquery.org", "MIT"],
				["Front-end", "Twitter Bootstrap",           "3.0.0",    "http://getbootstra.com", "MIT"],
				["Front-end", "Bootstrap Material Design",   "",         "http://fezvrasta.github.io/bootstrap-material-design/", "MIT"],
				["Front-end", "TinyMCE",                     "4.4.3",    "http://www.tinymce.com", "LGPL"],
				["Front-end", "Highcharts",                  "",         "http://highcharts.com", "Creative Commons BY-NC 3.0"],
				["Front-end", "ngFileUpload",                "",         "https://github.com/danialfarid/ng-file-upload", "MIT"],
				["Front-end", "ngToast",                     "",         "https://github.com/tameraydin/ngToast", "MIT"],
				["Front-end", "ArriveJS",                    "",         "https://github.com/uzairfarooq/arrive", "MIT"],
				["Front-end", "AngularUI",                   "",         "https://angular-ui.github.io/", "MIT"],
				["Front-end", "Angular Bootstrap Lightbox",  "",         "https://github.com/compact/angular-bootstrap-lightbox", "MIT"],
				["Aplicativo", "Apache Cordova",             "6.x",         "https://cordova.apache.org/", "Apache"],
				["Aplicativo", "ngCordova",                  "",         "http://ngcordova.com/", "MIT"],
			];
		});

})();
(function() {

	angular
		.module('BuscaAtivaEscolar')
		.controller('AlertModalCtrl', function AlertModalCtrl($scope, $q, $uibModalInstance, message, details) {

			$scope.message = message;
			$scope.details = details;

			$scope.dismiss = function() {
				$uibModalInstance.dismiss();
			};

		});

})();
(function() {

	angular
		.module('BuscaAtivaEscolar')
		.controller('ConfirmModalCtrl', function ConfirmModalCtrl($scope, $q, $uibModalInstance, message, details, canDismiss) {

			console.log("[modal] confirm_modal", message, details, canDismiss);

			$scope.message = message;
			$scope.details = details;
			$scope.canDismiss = canDismiss;

			$scope.agree = function() {
				$uibModalInstance.close(true);
			};

			$scope.disagree = function() {
				$uibModalInstance.dismiss(false);
			};

		});

})();
(function() {

	angular
		.module('BuscaAtivaEscolar')
		.controller('PromptModalCtrl', function PromptModalCtrl($scope, $q, $uibModalInstance, question, defaultAnswer, canDismiss) {

			console.log("[modal] prompt_modal", question, canDismiss);

			$scope.question = question;
			$scope.answer = defaultAnswer;

			$scope.ok = function() {
				$uibModalInstance.close({response: $scope.answer});
			};

			$scope.cancel = function() {
				$uibModalInstance.dismiss(false);
			};

		});

})();
(function() {

	angular.module('BuscaAtivaEscolar').service('Identity', function () {

		var mockUsers = {
			'agente_comunitario': {
				name: 'Mary Smith',
				email: 'mary.smith@saopaulo.sp.gov.br',
				type: 'Agente Comunitário',
				can: ['dashboard']
			},
			'tecnico_verificador': {
				name: 'Paul Atree',
				email: 'paul.atree@saopaulo.sp.gov.br',
				type: 'Técnico Verificador',
				can: ['preferences', 'dashboard','cases']
			},
			'supervisor_institucional': {
				name: 'John Doe',
				email: 'john.doe@saopaulo.sp.gov.br',
				type: 'Supervisor Institucional',
				can: ['preferences', 'dashboard','cases','reports', 'users']
			},
			'coordenador_operacional': {
				name: 'Aryel Tupinambá',
				email: 'atupinamba@saopaulo.sp.gov.br',
				type: 'Coordenador Operacional',
				can: ['preferences', 'dashboard','cases','reports','users', 'users.edit', 'users.create', 'settings']
			},
			'gestor_politico': {
				name: 'João das Neves',
				email: 'jneves@saopaulo.sp.gov.br',
				type: 'Gestor Político',
				can: ['preferences', 'dashboard','reports','users']
			},
			'gestor_nacional': {
				name: 'Jane Doe',
				email: 'fdenp@unicef.org.br',
				type: 'Gestor Nacional',
				can: ['preferences', 'dashboard','reports','cities', 'users.filter_by_city']
			},
			'super_administrador': {
				name: 'Morgan Freeman',
				email: 'dev@lqdi.net',
				type: 'Super Administrador',
				can: ['preferences', 'dashboard','reports','cities','cities.edit','users','users.edit', 'users.create', 'settings', 'users.filter_by_city']
			}
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

			if(window.zE) {
				zE.identify({
					name: currentUser.name,
					email: currentUser.email
				});
			}
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
(function() {

	angular
		.module('BuscaAtivaEscolar')
		.factory('Modals', function($q, $uibModal) {

			return {

				show: function(params) {

					var def = $q.defer();

					var instance = $uibModal.open(params);

					instance.result.then(function (data) {
						def.resolve(data.response);
					}, function (data) {
						def.reject(data);
					});

					return def.promise;
				},


				Alert: function(message, details) {
					return {
						templateUrl: '/modals/alert.html',
						controller: 'AlertModalCtrl',
						size: 'sm',
						resolve: {
							message: function() { return message; },
							details: function() { return details; }
						}
					};
				},

				Confirm: function(message, details, canDismiss) {
					var params = {
						templateUrl: '/modals/confirm.html',
						controller: 'ConfirmModalCtrl',
						size: 'sm',
						resolve: {
							message: function() { return message; },
							details: function() { return details; },
							canDismiss: function() { return canDismiss; }
						}
					};

					if (!canDismiss) {
						params.keyboard = false;
						params.backdrop = 'static';
					}

					return params;
				},

				Prompt: function(question, defaultAnswer, canDismiss) {
					var params = {
						templateUrl: '/modals/prompt.html',
						controller: 'PromptModalCtrl',
						size: 'md',
						resolve: {
							question: function() { return question; },
							defaultAnswer: function() { return defaultAnswer; },
							canDismiss: function() { return canDismiss; }
						}
					};

					if (!canDismiss) {
						params.keyboard = false;
						params.backdrop = 'static';
					}

					return params;
				}

			}
		});
})();
(function() {

	angular.module('BuscaAtivaEscolar').service('Notifications', function ($rootScope, $http, ngToast) {

		$rootScope.notifications = [];

		function push(messageClass, messageBody) {
			ngToast.create({
				className: messageClass,
				content: messageBody
			});

			$rootScope.notifications.push({
				class: messageClass,
				contents: messageBody,
				hide: hide,
				open: open
			});
		}

		function open($event, index) {
			location.hash = '#/cases';
			return false;
		}

		function hide($event, index) {
			$rootScope.notifications.splice(index, 1);

			$event.stopPropagation();
			$event.stopImmediatePropagation();
			$event.preventDefault();

			return false;
		}

		function get() {
			return $rootScope.notifications;
		}

		function clear() {
			$rootScope.notifications = [];
		}

		return {
			push: push,
			get: get,
			clear: clear
		}

	});

})();
(function() {

	angular.module('BuscaAtivaEscolar').run(function() {
		Array.prototype.shuffle = function() {
			var i = this.length, j, temp;
			if ( i == 0 ) return this;
			while ( --i ) {
				j = Math.floor( Math.random() * ( i + 1 ) );
				temp = this[i];
				this[i] = this[j];
				this[j] = temp;
			}
			return this;
		}

		Array.prototype.clone = function() {
			return this.slice(0);
		};
	});

})();
//# sourceMappingURL=app.js.map
