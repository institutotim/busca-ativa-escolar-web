(function() {

	angular.module('BuscaAtivaEscolar').directive('appNavbar', function () {

		function init(scope, element, attrs) {
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