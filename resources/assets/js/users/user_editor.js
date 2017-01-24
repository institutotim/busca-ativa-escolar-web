(function() {

	angular.module('BuscaAtivaEscolar')
		.config(function ($stateProvider) {
			$stateProvider.state('user_editor', {
				url: '/users/{user_id}',
				templateUrl: '/views/users/editor.html',
				controller: 'UserEditorCtrl'
			})
		})
		.controller('UserEditorCtrl', function ($scope, $state, $stateParams, ngToast, Utils, Identity, Users, Groups, StaticData) {

			$scope.isCreating = (!$stateParams.user_id || $stateParams.user_id === "new");
			$scope.identity = Identity;
			$scope.static = StaticData;

			$scope.groups = Groups.find();
			$scope.user = $scope.isCreating
				? {}
				: Users.find({id: $stateParams.user_id});

			$scope.save = function() {

				$scope.user = prepareDateFields($scope.user);

				if($scope.isCreating) {
					return Users.create($scope.user).$promise.then(onSaved)
				}

				Users.update($scope.user).$promise.then(onSaved);

			};

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

					if($scope.isCreating) $state.go('user_editor', {user_id: res.id});

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