(function() {

	angular.module('BuscaAtivaEscolar')
		.config(function ($stateProvider) {
			$stateProvider.state('user_preferences', {
				url: '/user_preferences',
				templateUrl: '/views/preferences/manage_user_preferences.html',
				controller: 'ManageUserPreferencesCtrl'
			})
		})
		.controller('ManageUserPreferencesCtrl', function ($scope, $rootScope, ngToast, UserPreferences, StaticData) {

			$scope.static = StaticData;
			$scope.settings = {};

			$scope.refresh = function() {
				UserPreferences.get({}, function (res) {
					$scope.settings = res.settings;
				});
			};

			$scope.save = function() {
				UserPreferences.update({settings: $scope.settings}, $scope.refresh);
			};

			$scope.refresh();

		});

})();