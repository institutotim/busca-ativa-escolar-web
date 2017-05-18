(function() {

	angular.module('BuscaAtivaEscolar').directive('appPrintHeader', function (Identity, Platform, Auth) {

		function init(scope, element, attrs) {
			scope.identity = Identity;
			scope.auth = Auth;
			scope.platform = Platform;
		}

		return {
			link: init,
			replace: true,
			templateUrl: '/views/components/print_header.html'
		};
	});

})();