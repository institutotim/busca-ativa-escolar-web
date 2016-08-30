(function() {

	angular.module('BuscaAtivaEscolar').directive('appNavbar', function () {

		function init(scope, element, attrs) {
			scope.cityName = 'São Paulo';
		}

		return {
			link: init,
			templateUrl: 'navbar.html'
		};
	});

})();