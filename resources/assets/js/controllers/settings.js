(function() {

	angular.module('BuscaAtivaEscolar').controller('SettingsCtrl', function ($scope, $rootScope, MockData, Identity) {

		$rootScope.section = 'settings';
		$scope.identity = Identity;

	});

})();