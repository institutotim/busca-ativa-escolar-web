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

		var fieldNames = {
			cpf: 'CPF',
			name: 'nome',
			email: 'e-mail institucional',
			position: 'posição',
			institution: 'instituição',
			password: 'senha',
			dob: 'data de nascimento',
			phone: 'telefone institucional',
			mobile: 'celular institucional',
			personal_phone: 'telefone pessoal',
			personal_mobile: 'celular pessoal'
		};

		var messages = {
			invalid_gp: 'Dados do gestor político incompletos! Campos inválidos: ',
			invalid_mayor: 'Dados do prefeito incompletos! Campos inválidos: '
		};

		var requiredAdminFields = ['email','name','cpf','dob','phone'];
		var requiredMayorFields = ['email','name','cpf','dob','phone'];

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

			if($scope.step === 2 && !Utils.isValid($scope.form.admin, requiredAdminFields, fieldNames, messages.invalid_gp)) return;
			if($scope.step === 3 && !Utils.isValid($scope.form.mayor, requiredMayorFields, fieldNames, messages.invalid_mayor)) return;

			$scope.step++;
			$window.scrollTo(0, 0);
		};

		$scope.prevStep = function() {
			if($scope.step <= 1) return;

			$scope.step--;
			$window.scrollTo(0, 0);
		};

		$scope.onCitySelect = function(uf, city) {
			if(!uf || !city) return;
			$scope.checkCityAvailability(city);
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

				if(!Utils.isValid(data.admin, requiredAdminFields, messages.invalid_gp)) return;
				if(!Utils.isValid(data.mayor, requiredMayorFields, messages.invalid_mayor)) return;

				data.city_id = (data.city) ? data.city.id : null;
				data.admin = Utils.prepareDateFields(data.admin, ['dob']);
				data.mayor = Utils.prepareDateFields(data.mayor, ['dob']);

				SignUps.register(data, function (res) {
					if(res.status === 'ok') {
						ngToast.success('Solicitação de adesão registrada!');
						$scope.step = 5;
						return;
					}

					if(res.reason === 'political_admin_email_in_use') {
						$scope.step = 2;
						return ngToast.danger('O e-mail indicado para o gestor político já está em uso. Por favor, escolha outro e-mail');
					}

					if(res.reason === 'invalid_political_admin_data') {
						$scope.step = 2;
						return ngToast.danger(messages.invalid_gp + res.fields.join(", "));
					}

					ngToast.danger("Ocorreu um erro ao registrar a adesão: " + res.reason);

				});

			});
		};

	});

})();