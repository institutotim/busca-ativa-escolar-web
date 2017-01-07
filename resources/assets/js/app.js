(function() {
	angular
		.module('BuscaAtivaEscolar', [
			'ngToast',
			'ngAnimate',
			'ngCookies',
			'ngResource',
			'ngStorage',

			'BuscaAtivaEscolar.Config',

			'angularMoment',
			'highcharts-ng',

			'ui.router',
			'ui.bootstrap',
			'ui.select'
		])

		.run(function($rootScope, $cookies, Config, Identity) {

			Config.setEndpoint($cookies.get('FDENP_API_ENDPOINT') || Config.CURRENT_ENDPOINT);

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

		.config(function(ngToastProvider) {
			ngToastProvider.configure({
				verticalPosition: 'top',
				horizontalPosition: 'right',
				maxNumber: 3,
				animation: 'slide',
				dismissButton: true,
				timeout: 3000
			});
		})

		.config(function ($httpProvider) {
			$httpProvider.interceptors.push('AddAuthorizationHeadersInterceptor');
		})

		.run(function ($state) {
			console.log($state);
		})

		.config(function($stateProvider, $locationProvider, $urlRouterProvider) {

			$locationProvider.html5Mode(true);
			$urlRouterProvider.otherwise('/dashboard');

			// TODO: refactor to validate existing session

			var NC = (new Date()).getTime();

			//$urlRouterProvider.otherwise('login');
			$stateProvider.
			state('login', {
				url: '/login',
				templateUrl: '/views/login.html?NC=' + NC,
				controller: 'LoginCtrl'
			}).
			state('dashboard', {
				url: '/dashboard',
				templateUrl: '/views/dashboard.html?NC=' + NC,
				controller: 'DashboardCtrl'
			}).
			state('preferences', {
				url: '/preferences',
				templateUrl: '/views/preferences/manage.html?NC=' + NC,
				controller: 'PreferencesCtrl'
			}).
			state('developer_mode', {
				url: '/developer_mode',
				templateUrl: '/views/developer/developer_dashboard.html?NC=' + NC,
				controller: 'DeveloperCtrl'
			}).
			state('cases', {
				url: '/cases',
				templateUrl: '/views/cases/list.html?NC=' + NC,
				controller: 'CaseSearchCtrl'
			}).
			state('cases.create_alert', {
				url: '/create_alert',
				templateUrl: '/views/cases/create_alert.html?NC=' + NC,
				controller: 'CreateAlertCtrl'
			}).
			state('case_view', {
				url: '/cases/view/{case_id}',
				templateUrl: '/views/cases/view/main.html?NC=' + NC,
				controller: 'CaseViewCtrl'
			}).
			state('users', {
				url: '/users',
				templateUrl: '/views/users/list.html?NC=' + NC,
				controller: 'UserSearchCtrl'
			}).
			state('user_view', {
				url: '/users/view/{user_id}',
				templateUrl: '/views/users/view.html?NC=' + NC//,
				//controller: 'UserViewCtrl'
			}).
			state('cities', {
				url: '/cities',
				templateUrl: '/views/cities/list.html?NC=' + NC,
				controller: 'CitySearchCtrl'
			}).
			state('settings', {
				url: '/settings',
				templateUrl: '/views/settings/manage_settings.html?NC=' + NC,
				controller: 'SettingsCtrl'
			}).
			state('settings.parameterize_group', {
				url: '/parameterize_group/{group_id}',
				templateUrl: '/views/settings/parameterize_group.html?NC=' + NC,
				controller: 'ParameterizeGroupCtrl'
			}).
			state('reports', {
				url: '/reports',
				templateUrl: '/views/reports/browser.html?NC=' + NC,
				controller: 'ReportsCtrl'
			}).
			state('credits', {
				url: '/credits',
				templateUrl: '/views/static/credits.html?NC=' + NC,
				controller: 'CreditsCtrl'
			}).
			state('sign_up', {
				url: '/sign_up',
				templateUrl: '/views/sign_up/main.html?NC=' + NC,
				controller: 'SignUpCtrl'
			}).
			state('first_time_setup', {
				url: '/first_time_setup',
				templateUrl: '/views/first_time_setup/main.html?NC=' + NC,
				controller: 'FirstTimeSetupCtrl'
			});
		});
})();