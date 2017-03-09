(function() {

	angular.module('BuscaAtivaEscolar')
		.config(function ($stateProvider) {
			$stateProvider.state('user_editor', {
				url: '/users/{user_id}?quick_add',
				templateUrl: '/views/users/editor.html',
				controller: 'UserEditorCtrl'
			})
		})
		.controller('UserEditorCtrl', function ($rootScope, $scope, $state, $stateParams, ngToast, Platform, Cities, Utils, Tenants, Identity, Users, Groups, StaticData) {

			$scope.user = {};
			$scope.isCreating = (!$stateParams.user_id || $stateParams.user_id === "new");
			$scope.isReviewing = false;

			$scope.identity = Identity;
			$scope.static = StaticData;

			$scope.groups = Groups.find();
			$scope.tenants = Tenants.find();
			$scope.quickAdd = ($stateParams.quick_add === 'true');

			var dateOnlyFields = ['dob'];

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

				var data = Object.assign({}, $scope.user);
				data = Utils.prepareDateFields(data, dateOnlyFields);
				data = Utils.prepareCityFields(data, ['work_city']);

				if($scope.isCreating) {
					return Users.create(data).$promise.then(onSaved)
				}

				Users.update(data).$promise.then(onSaved);

			};

			function prepareUserModel(user) {
				return Utils.unpackDateFields(user, dateOnlyFields)
			}

			function onSaved(res) {
				if(res.status === "ok") {
					ngToast.success("Dados de usuário salvos com sucesso!");

					if($scope.quickAdd && $rootScope.previousState) return $state.go($rootScope.previousState, $rootScope.previousStateParams);
					if($scope.isCreating) return $state.go('user_editor', {user_id: res.id});

					return;
				}

				if(res.messages) return Utils.displayValidationErrors(res);

				ngToast.danger("Ocorreu um erro ao salvar o usuário: ", res.status);
			}

		});

})();