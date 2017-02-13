(function() {

	angular.module('BuscaAtivaEscolar')
		.controller('ManageCaseWorkflowCtrl', function ($scope, $rootScope, $q, ngToast, Platform, Identity, Tenants, Groups, StaticData) {

			$scope.static = StaticData;

			$scope.groups = [];
			$scope.tenantSettings = {};

			$scope.getGroups = function() {
				if(!$scope.groups) return [];
				return $scope.groups;
			};

			$scope.save = function() {

				var promises = [];

				for(var i in $scope.groups) {
					if(!$scope.groups.hasOwnProperty(i)) continue;
					console.log('\t[manage_case_workflow.save] Update group: ', $scope.groups[i]);
					promises.push( Groups.updateSettings($scope.groups[i]).$promise );
				}

				console.log('\t[manage_case_workflow.save] Update tenant: ', $scope.tenantSettings);
				promises.push( Tenants.updateSettings($scope.tenantSettings).$promise );

				$q.all(promises).then(
					function (res) {
						ngToast.success('Configurações salvas com sucesso!');
						console.log('[manage_case_workflow.save] Saved! ', res);
						$scope.refresh();
					}, function (err) {
						ngToast.danger('Ocorreu um erro ao salvar as configurações!');
						console.error('[manage_case_workflow.save] Error: ', err);
					}
				);

			};

			$scope.refresh = function() {
				Groups.find({with: 'settings'}, function(res) {
					$scope.groups = res.data;
				});

				Tenants.getSettings(function (res) {
					$scope.tenantSettings = res.settings;
				});
			};

			Platform.whenReady(function() {
				$scope.refresh();
			})

		});

})();