(function() {
	angular
		.module('BuscaAtivaEscolar', [

			'ngRoute',
			'ngToast',
			'ngAnimate',
			'ngCookies',
			'ngResource',
			'ngStorage',


			'BuscaAtivaEscolar.Config',

			'angularMoment',
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

		.config(function ($locationProvider) {
			$locationProvider.html5Mode(true);
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

		.config(function($routeProvider) {

			// TODO: replace with UI-Router

			var NC = (new Date()).getTime();

			$routeProvider.
				when('/dashboard', {
					templateUrl: '/views/dashboard.html?NC=' + NC,
					controller: 'DashboardCtrl'
				}).
				when('/preferences', {
					templateUrl: '/views/preferences/manage.html?NC=' + NC,
					controller: 'PreferencesCtrl'
				}).
				when('/developer_mode', {
					templateUrl: '/views/developer/developer_dashboard.html?NC=' + NC,
					controller: 'DeveloperCtrl'
				}).
				when('/cases', {
					templateUrl: '/views/cases/list.html?NC=' + NC,
					controller: 'CaseSearchCtrl'
				}).
				when('/cases/create_alert', {
					templateUrl: '/views/cases/create_alert.html?NC=' + NC,
					controller: 'CreateAlertCtrl'
				}).
				when('/cases/:case_id', {
					templateUrl: '/views/cases/view/main.html?NC=' + NC,
					controller: 'CaseViewCtrl'
				}).
				when('/users', {
					templateUrl: '/views/users/list.html?NC=' + NC,
					controller: 'UserSearchCtrl'
				}).
				when('/users/:user_id', {
					templateUrl: '/views/users/view.html?NC=' + NC,
					controller: 'UserViewCtrl'
				}).
				when('/cities', {
					templateUrl: '/views/cities/list.html?NC=' + NC,
					controller: 'CitySearchCtrl'
				}).
				when('/settings', {
					templateUrl: '/views/settings/manage_settings.html?NC=' + NC,
					controller: 'SettingsCtrl'
				}).
				when('/settings/parameterize_group/:group_id', {
					templateUrl: '/views/settings/parameterize_group.html?NC=' + NC,
					controller: 'ParameterizeGroupCtrl'
				}).
				when('/reports', {
					templateUrl: '/views/reports/browser.html?NC=' + NC,
					controller: 'ReportsCtrl'
				}).
				when('/credits', {
					templateUrl: '/views/static/credits.html?NC=' + NC,
					controller: 'CreditsCtrl'
				}).
				when('/sign_up', {
					templateUrl: '/views/sign_up/main.html?NC=' + NC,
					controller: 'SignUpCtrl'
				}).
				when('/first_time_setup', {
					templateUrl: '/views/first_time_setup/main.html?NC=' + NC,
					controller: 'FirstTimeSetupCtrl'
				}).
				otherwise({
					redirectTo: '/dashboard'
				});
		});
})();