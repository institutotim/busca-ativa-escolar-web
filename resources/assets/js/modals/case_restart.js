(function() {

	angular
		.module('BuscaAtivaEscolar')
		.controller('CaseRestartModalCtrl', function CaseRestartModalCtrl($scope, $q, $uibModalInstance) {

			console.log("[modal] case_restart");

			$scope.step = 1;
			$scope.reason = "";

			$scope.ok = function() {
				$uibModalInstance.close({response: $scope.reason});
			};

			$scope.cancel = function() {
				$uibModalInstance.dismiss(false);
			};

		});

})();