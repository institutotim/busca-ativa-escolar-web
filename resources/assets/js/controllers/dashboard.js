(function() {

	angular.module('BuscaAtivaEscolar').controller('DashboardCtrl', function ($scope, moment, Platform, Identity, StaticData, Reports, Charts) {

		$scope.identity = Identity;
		$scope.static = StaticData;

		$scope.ready = false;

		Platform.whenReady(function() {
			$scope.ready = true;
		})


	});

})();