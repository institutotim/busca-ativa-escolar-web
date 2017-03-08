(function() {

	angular.module('BuscaAtivaEscolar')
		.config(function ($stateProvider) {
			$stateProvider.state('child_browser', {
				url: '/children',
				templateUrl: '/views/children/browser.html',
				controller: 'ChildSearchCtrl'
			})
		})
		.controller('ChildSearchCtrl', function ($scope, Children, Decorators) {

			$scope.Decorators = Decorators;
			$scope.Children = Children;

			$scope.defaultQuery = {
				name: '',
				step_name: '',
				cause_name: '',
				assigned_user_name: '',
				location_full: '',
				alert_status: ['accepted'],
				case_status: ['in_progress'],
				risk_level: ['low','medium','high'],
				age: {from: 0, to: 28},
				age_null: true,
				gender: ['male', 'female', 'undefined'],
				gender_null: true,
				place_kind: ['rural','urban'],
				place_kind_null: true,
			};

			$scope.resetQuery = function() {
				return $scope.query = angular.merge({}, $scope.defaultQuery);;
			};

			$scope.query = $scope.resetQuery();
			$scope.search = {};

			$scope.refresh = function() {
				$scope.search = Children.search($scope.query);
			};

			$scope.refresh();


		});

})();