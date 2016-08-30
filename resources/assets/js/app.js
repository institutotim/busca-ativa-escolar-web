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
			when('/dashboard/coordenador-operacional', {
				templateUrl: 'dashboards/coordenador_operacional.html?NC=' + NC,
				controller: 'DashboardCtrl'
			}).
			otherwise({
				redirectTo: '/dashboard/coordenador-operacional'
			});
		}]);
})();