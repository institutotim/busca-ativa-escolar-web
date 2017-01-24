(function() {
	identify('config', 'states.js');

	angular.module('BuscaAtivaEscolar')
		.config(function($stateProvider, $locationProvider, $urlRouterProvider) {

			$locationProvider.html5Mode(true);
			$urlRouterProvider.otherwise('/dashboard');

			$stateProvider
				.state('login', {
					url: '/login',
					templateUrl: '/views/login.html',
					controller: 'LoginCtrl',
					unauthenticated: true
				})
				.state('dashboard', {
					url: '/dashboard',
					templateUrl: '/views/dashboard.html',
					controller: 'DashboardCtrl'
				})
				.state('preferences', {
					url: '/preferences',
					templateUrl: '/views/preferences/manage.html',
					controller: 'PreferencesCtrl'
				})
				.state('developer_mode', {
					url: '/developer_mode',
					templateUrl: '/views/developer/developer_dashboard.html',
					controller: 'DeveloperCtrl',
					unauthenticated: true

				})
				.state('cities', {
					url: '/cities',
					templateUrl: '/views/cities/list.html',
					controller: 'CitySearchCtrl'
				})
				.state('settings', {
					url: '/settings',
					templateUrl: '/views/settings/manage_settings.html',
					controller: 'SettingsCtrl'
				})
				.state('settings.parameterize_group', {
					url: '/parameterize_group/{group_id}',
					templateUrl: '/views/settings/parameterize_group.html',
					controller: 'ParameterizeGroupCtrl'
				})
				.state('reports', {
					url: '/reports',
					templateUrl: '/views/reports/browser.html',
					controller: 'ReportsCtrl'
				})
				.state('credits', {
					url: '/credits',
					templateUrl: '/views/static/credits.html',
					controller: 'CreditsCtrl',
					unauthenticated: true
				})
				.state('sign_up', {
					url: '/sign_up',
					templateUrl: '/views/sign_up/main.html',
					controller: 'SignUpCtrl',
					unauthenticated: true
				})
				.state('first_time_setup', {
					url: '/first_time_setup',
					templateUrl: '/views/first_time_setup/main.html',
					controller: 'FirstTimeSetupCtrl',
					unauthenticated: true
				});
		});

})();