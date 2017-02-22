(function() {

	angular.module('BuscaAtivaEscolar')
		.config(function ($stateProvider) {
			$stateProvider.state('pending_signups', {
				url: '/pending_signups',
				templateUrl: '/views/tenants/pending_signups.html',
				controller: 'PendingSignupsCtrl'
			})
		})
		.controller('PendingSignupsCtrl', function ($scope, $rootScope, ngToast, Identity, SignUps, StaticData) {

			$scope.identity = Identity;
			$scope.static = StaticData;

			$scope.signups = {};
			$scope.signup = {};

			$scope.refresh = function() {
				$scope.signups = SignUps.getPending();
			};

			$scope.preview = function(signup) {
				$scope.signup = signup;
			};

			$scope.approve = function(signup) {
				SignUps.approve({id: signup.id}, function() {
					$scope.refresh();
					$scope.signup = {};
				});
			};

			$scope.reject = function(signup) {
				SignUps.reject({id: signup.id}, function() {
					$scope.refresh();
					$scope.signup = {};
				});
			};

			$scope.resendNotification = function(signup) {
				SignUps.resendNotification({id: signup.id}, function() {
					ngToast.success('Notificação reenviada!');
				});
			};

			$scope.refresh();

		});

})();