(function() {

	angular.module('BuscaAtivaEscolar')
		.config(function ($stateProvider) {
			$stateProvider.state('admin_setup', {
				url: '/admin_setup/{id}?token',
				templateUrl: '/views/initial_admin_setup/main.html',
				controller: 'AdminSetupCtrl',
				unauthenticated: true
			});
		})
		.controller('AdminSetupCtrl', function ($scope, $stateParams, $window, moment, ngToast, Platform, Utils, SignUps, Cities, Modals, StaticData) {

			$scope.static = StaticData;

			var signupID = $stateParams.id;
			var signupToken = $stateParams.token;

			console.info('[admin_setup] Admin setup for signup: ', signupID, 'token=', signupToken);

			$scope.step = 1;
			$scope.numSteps = 4;
			$scope.ready = false;

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

			var requiredAdminFields = ['email','name','cpf','dob','phone','password'];

			var messages = {
				invalid_gp: 'Dados do gestor político incompletos! Campos inválidos: ',
				invalid_co: 'Dados do coordenador operacional incompletos! Campos inválidos: '
			};

			$scope.signup = {};
			$scope.admins = {
				political: {},
				operational: {}
			};

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

				if($scope.step === 3 && !Utils.isValid($scope.admins.political, requiredAdminFields, fieldNames, messages.invalid_gp)) return;
				if($scope.step === 4 && !Utils.isValid($scope.admins.operational, requiredAdminFields, fieldNames, messages.invalid_co)) return;

				$scope.step++;
				$window.scrollTo(0, 0);
			};

			$scope.prevStep = function() {
				if($scope.step <= 1) return;

				$scope.step--;
				$window.scrollTo(0, 0);
			};

			$scope.fetchSignupDetails = function() {
				SignUps.getViaToken({id: signupID, token: signupToken}, function (data) {
					$scope.ready = true;
					$scope.signup = data;
					$scope.admins.political = data.data.admin;
					$scope.admins.political.dob = moment(data.data.admin.dob).toDate();
					$scope.step = 3;
				});
			};

			$scope.provisionTenant = function() {

				if(!Utils.isValid($scope.admins.political, requiredAdminFields, fieldNames, messages.invalid_gp)) return;
				if(!Utils.isValid($scope.admins.operational, requiredAdminFields, fieldNames, messages.invalid_co)) return;

				Modals.show(Modals.Confirm(
					'Tem certeza que deseja prosseguir com o cadastro?',
					'Os dados informados serão usados para criar os usuários administradores. A configuração do município será efetuada pelo Coordenador Operacional.'
				)).then(function(res) {
					var data = {
						id: signupID,
						token: signupToken
					};

					data.political = Object.assign({}, $scope.admins.political);
					data.political = Utils.prepareDateFields(data.political, ['dob']);

					data.operational = Object.assign({}, $scope.admins.operational);
					data.operational = Utils.prepareDateFields(data.operational, ['dob']);

					SignUps.complete(data, function (res) {
						if(res.status === 'ok') {
							ngToast.success('Adesão finalizada!');
							$scope.step = 5;
							return;
						}

						ngToast.danger("Ocorreu um erro ao finalizar a adesão: " + res.reason);

					});

				});
			};

			$scope.fetchSignupDetails();

		});

})();