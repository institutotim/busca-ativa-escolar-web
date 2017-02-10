(function() {

	angular.module('BuscaAtivaEscolar')
		.config(function ($stateProvider) {
			$stateProvider.state('pending_alerts', {
				url: '/pending_alerts',
				templateUrl: '/views/children/pending_alerts.html',
				controller: 'PendingAlertsCtrlCtrl'
			})
		})
		.controller('PendingAlertsCtrlCtrl', function ($scope, $rootScope, Identity, Alerts, StaticData) {

			$scope.identity = Identity;

			$scope.children = {};
			$scope.child = {};
			$scope.causes = {};

			$scope.$on('StaticData.ready', function() {
				$scope.causes = StaticData.getAlertCauses()
			});

			$scope.getAlertCauseName = function() {
				if(!$scope.child.alert) return;
				if(!$scope.child.alert.alert_cause_id) return;
				if(!$scope.causes[$scope.child.alert.alert_cause_id]) return;
				return $scope.causes[$scope.child.alert.alert_cause_id].label;
			};

			$scope.static = StaticData;

			$scope.refresh = function() {
				$scope.children = Alerts.getPending();
			};

			$scope.preview = function(child) {
				$scope.child = child;
			};

			$scope.accept = function(child) {
				Alerts.accept({id: child.id}, function() {
					$scope.refresh();
					$scope. child = {};
				});
			};

			$scope.reject = function(child) {
				Alerts.reject({id: child.id}, function() {
					$scope.refresh();
					$scope.child = {};
				});
			};

			$scope.refresh();

		});

})();