(function() {

	angular.module('BuscaAtivaEscolar').controller('SignUpCtrl', function ($scope, $rootScope, $window, ngToast, Utils, SignUps, Cities, Modals, StaticData) {

		$scope.static = StaticData;

		$scope.step = 1;
		$scope.numSteps = 5;
		$scope.isCityAvailable = false;

		$scope.form = {
			uf: null,
			city: null,
			admin: {},
			mayor: {}
		};
		$scope.agreeTOS = 0;

		$scope.fetchCities = function(query) {
			var data = {name: query, $hide_loading_feedback: true};
			if($scope.form.uf) data.uf = $scope.form.uf;

			return Cities.search(data).$promise.then(function (res) {
				return res.results;
			});
		};

		$scope.renderSelectedCity = function(city) {
			if(!city) return '';
			return city.uf + ' / ' + city.name;
		};

		$scope.goToStep = function (step) {
			if($scope.step < 1) return;
			if($scope.step > $scope.numSteps) return;

			$scope.step = step;
			$window.scrollTo(0, 0);
		};

		$scope.nextStep = function() {
			if($scope.step >= $scope.numSteps) return;

			$scope.step++;
			$window.scrollTo(0, 0);
		};

		$scope.prevStep = function() {
			if($scope.step <= 1) return;

			$scope.step--;
			$window.scrollTo(0, 0);
		};

		$scope.checkCityAvailability = function(city) {

			if(!$scope.form.uf) $scope.form.uf = city.uf;

			$scope.hasCheckedAvailability = false;

			Cities.checkIfAvailable({id: city.id}, function (res) {
				$scope.hasCheckedAvailability = true;
				$scope.isCityAvailable = !!res.is_available;
			});
		};

		$scope.finish = function() {
			if(!$scope.agreeTOS) return;

			Modals.show(Modals.Confirm(
				'Tem certeza que deseja prosseguir com o cadastro?',
				'Os dados informados serão enviados para validação e aprovação de nossa equipe. Caso aprovado, você receberá uma mensagem em seu e-mail institucional com os dados para acesso à plataforma, e instruções de como configurá-la.'
			)).then(function(res) {
				var data = {};
				data.admin = Object.assign({}, $scope.form.admin);
				data.mayor = Object.assign({}, $scope.form.mayor);
				data.city = Object.assign({}, $scope.form.city);

				data.city_id = (data.city) ? data.city.id : null;
				data.admin = Utils.prepareDateFields(data.admin, ['dob']);
				data.mayor = Utils.prepareDateFields(data.mayor, ['dob']);

				SignUps.register(data, function (res) {
					if(res.status === 'ok') {
						ngToast.success('Solicitação de adesão registrada!');
						$scope.step = 5;
						return;
					}

					ngToast.danger("Ocorreu um erro ao registrar a adesão: " + res.reason);

				});

			});
		};

	});

})();