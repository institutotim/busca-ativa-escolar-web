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
				when('/cases/:case_id', {
					templateUrl: 'cases/view.html?NC=' + NC,
					controller: 'CaseViewCtrl'
				}).
				when('/cases/:case_id/map', {
					templateUrl: 'cases/view.html?NC=' + NC,
					controller: 'CaseViewCtrl'
				}).
				when('/cases/:case_id/comments', {
					templateUrl: 'cases/view.html?NC=' + NC,
					controller: 'CaseViewCtrl'
				}).
				otherwise({
					redirectTo: '/dashboard'
				});
		}]);
})();