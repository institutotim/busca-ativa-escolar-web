(function() {

	angular
		.module('BuscaAtivaEscolar')
		.controller('AlertModalCtrl', function AlertModalCtrl($scope, $q, $uibModalInstance, message, details) {

			$scope.message = message;
			$scope.details = details;

			$scope.dismiss = function() {
				$uibModalInstance.dismiss();
			};

		});

})();