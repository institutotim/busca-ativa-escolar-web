(function() {

	angular.module('BuscaAtivaEscolar')
		.config(function ($stateProvider) {
			$stateProvider.state('user_editor', {
				url: '/users/{user_id}?quick_add',
				templateUrl: '/views/users/editor.html',
				controller: 'UserEditorCtrl'
			})
		})
		.controller('UserEditorCtrl', function ($rootScope, $scope, $state, $stateParams, ngToast, Platform, Utils, Tenants, Identity, Users, Groups, StaticData) {

			$scope.user = {};
			$scope.isCreating = (!$stateParams.user_id || $stateParams.user_id === "new");
			$scope.isReviewing = false;

			$scope.identity = Identity;
			$scope.static = StaticData;

			$scope.groups = Groups.find();
			$scope.tenants = Tenants.find();
			$scope.quickAdd = !!$stateParams.quick_add;

			if(!$scope.isCreating) {
				$scope.user = Users.find({id: $stateParams.user_id}, prepareUserModel);
			}

			$scope.canDefineUserTenant = function() {
				if(Identity.getType() !== 'superuser' && Identity.getType() !== 'gestor_nacional') {
					return false;
				}

				return ($scope.user.type !== 'superuser' && $scope.user.type !== 'gestor_nacional');
			};

			$scope.openUser = function(user_id, is_reviewing) {
				$scope.isCreating = false;
				$scope.isReviewing = !!is_reviewing;
				$scope.user = Users.find({id: user_id}, prepareUserModel);
			};

			$scope.goBack = function() {
				return $state.go($rootScope.previousState, $rootScope.previousStateParams);
			};

			$scope.save = function() {

				$scope.user = prepareDateFields($scope.user);

				if($scope.isCreating) {
					return Users.create($scope.user).$promise.then(onSaved)
				}

				Users.update($scope.user).$promise.then(onSaved);

			};

			function prepareUserModel(user) {
				user.dob = new Date(user.dob + ' 12:00:00');
			}

			function prepareDateFields(data) {
				var dateOnlyFields = ['dob'];

				for(var i in data) {
					if(!data.hasOwnProperty(i)) continue;
					if(dateOnlyFields.indexOf(i) === -1) continue;

					data[i] = Utils.stripTimeFromTimestamp(data[i]);
				}

				return data;
			}

			function onSaved(res) {
				if(res.status === "ok") {
					ngToast.success("Dados de usuário salvos com sucesso!");

					if($scope.quickAdd && $rootScope.previousState) return $state.go($rootScope.previousState, $rootScope.previousStateParams);
					if($scope.isCreating) return $state.go('user_editor', {user_id: res.id});

					return;
				}

				if(res.fields) {
					ngToast.danger("Por favor, preencha corretamente os campos: " + Object.keys(res.fields).join(", "));
					return;
				}

				ngToast.danger("Ocorreu um erro ao salvar o usuário: ", res.status);
			}

		});

})();