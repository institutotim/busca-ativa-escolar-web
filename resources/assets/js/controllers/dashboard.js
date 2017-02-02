(function() {

	angular.module('BuscaAtivaEscolar').controller('DashboardCtrl', function ($scope, $rootScope, $location, Identity, StaticData, Language) {

		if(!Identity.isLoggedIn()) $location.path('/login');

		$rootScope.section = 'dashboard';
		$scope.identity = Identity;
		$scope.language = Language;
		$scope.static = StaticData;

		$scope.numLangStrings = function() {
			return Language.getNumStrings();
		}

	});

})();