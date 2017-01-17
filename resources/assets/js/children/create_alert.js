(function() {

	angular.module('BuscaAtivaEscolar')
		.config(function ($stateProvider) {
			$stateProvider.state('child_create_from_alert', {
				url: '/children/create_alert',
				templateUrl: '/views/children/create_alert.html',
				controller: 'CreateAlertCtrl'
			})
		})
		.controller('CreateAlertCtrl', function ($scope, $state, ngToast, Identity, StaticData, Children) {

			$scope.identity = Identity;
			$scope.static = StaticData;

			$scope.alert = {

			};

			$scope.createAlert = function() {

				// TODO: validate fields

				Children.spawnFromAlert($scope.alert).$promise.then(function (res) {
					if(res.fields) {
						ngToast.danger('Por favor, preencha todos os campos corretamente!');
						console.warn("[create_alert] Missing fields: ", res.fields);
						return;
					}

					if(!res || !res.child_id) {
						ngToast.danger('Ocorreu um erro ao registrar o alerta!');
						return;
					}

					// TODO: check if user can actually view child

					ngToast.success('Alerta registrado com sucesso!');
					$state.go('child_viewer', {child_id: res.child_id});
				});
			}

		});

})();