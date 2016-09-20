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

		.run(function() {

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