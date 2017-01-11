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
				name: 'José Fulano',
				rg: '223334445',
				cpf: '22233344455',
				mother_name: 'Maria Fulano',
				father_name: 'Jose Fulano',
				place_address: 'Rua Florida 123',
				place_cep: '09988777',
				place_neighborhood: 'Brooklin',
				place_city: 'Sao Paulo',
				place_uf: 'SP',
				place_phone: '1122223333',
				alert_cause_id: 10,
				gender: 'male',
				race: 'branca'
			};

			$scope.createAlert = function() {
				Children.spawnFromAlert($scope.alert).$promise.then(function (res) {
					if(!res || !res.child_id) {
						console.error("[child_alert] Failed to spawn child: ", res);
						ngToast.error('Ocorreu um erro ao registrar o alerta!');
						return;
					}

					// TODO: check if user can actually view child

					ngToast.success('Alerta registrado com sucesso!');
					$state.go('child_viewer', {child_id: res.child_id});
				});
			}

		});

})();