(function() {

	angular.module('BuscaAtivaEscolar').directive('appNavbar', function (Identity) {

		function init(scope, element, attrs) {
			scope.identity = Identity;
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