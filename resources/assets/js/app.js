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