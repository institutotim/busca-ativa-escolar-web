(function() {

	angular
		.module('BuscaAtivaEscolar')
		.controller('UserPickerModalCtrl', function UserPickerModalCtrl($scope, $q, $uibModalInstance, title, message, canDismiss) {

			console.log("[modal] user_picker", title, message);

			$scope.title = title;
			$scope.message = message;
			$scope.canDismiss = canDismiss;

			$scope.onSelect = function() {
				$uibModalInstance.close({response: $scope.selectedUser});
			};

			$scope.close = function() {
				$uibModalInstance.dismiss(false);
			}

		});

})();