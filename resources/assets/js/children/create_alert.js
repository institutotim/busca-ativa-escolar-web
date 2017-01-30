(function() {

	angular.module('BuscaAtivaEscolar')
		.config(function ($stateProvider) {
			$stateProvider.state('child_create_from_alert', {
				url: '/children/create_alert',
				templateUrl: '/views/children/create_alert.html',
				controller: 'CreateAlertCtrl'
			})
		})
		.controller('CreateAlertCtrl', function ($scope, $state, ngToast, Utils, Identity, StaticData, Children, Cities) {

			$scope.identity = Identity;
			$scope.static = StaticData;

			$scope.alert = {};

			function prepareDateFields(data) {
				var dateOnlyFields = ['dob'];

				for(var i in data) {
					if(!data.hasOwnProperty(i)) continue;
					if(dateOnlyFields.indexOf(i) === -1) continue;

					data[i] = Utils.stripTimeFromTimestamp(data[i]);
				}

				return data;
			}

			$scope.fetchCities = function(query) {
				var data = {name: query, $hide_loading_feedback: true};
				if($scope.alert.place_uf) data.uf = $scope.alert.place_uf;

				console.log("[create_alert] Looking for cities: ", data);

				return Cities.search(data).$promise.then(function (res) {
					return res.results;
				});
			};

			$scope.renderSelectedCity = function(city) {
				return city.uf + ' / ' + city.name;
			};

			$scope.createAlert = function() {

				// TODO: validate fields

				var data = $scope.alert;
				data = prepareDateFields(data);
				data.place_city_id = data.place_city ? data.place_city.id : null;
				data.place_city_name = data.place_city ? data.place_city.name : null;

				Children.spawnFromAlert(data).$promise.then(function (res) {
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