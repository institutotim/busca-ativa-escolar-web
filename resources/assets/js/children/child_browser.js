(function() {

	angular.module('BuscaAtivaEscolar')
		.config(function ($stateProvider) {
			$stateProvider.state('child_browser', {
				url: '/children',
				templateUrl: '/views/children/list.html',
				controller: 'ChildSearchCtrl'
			})
		})
		.controller('ChildSearchCtrl', function ($scope, Children, Decorators) {

			$scope.Decorators = Decorators;
			$scope.Children = Children;

			$scope.query = {
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

			$scope.checkboxes = {};
			$scope.search = {};

			$scope.isCheckboxChecked = function(field, value) {
				if(!$scope.query) return false;
				if(!$scope.query[field]) $scope.query[field] = [];
				return $scope.query[field].indexOf(value) !== -1;
			};

			$scope.toggleCheckbox = function (field, value) {
				if(!$scope.query[field]) $scope.query[field] = []; // Ensures list exists
				var index = $scope.query[field].indexOf(value); // Check if in list
				if(index === -1) return $scope.query[field].push(value); // Add to list
				return $scope.query[field].splice(index, 1); // Remove from list
			};

			$scope.refresh = function() {
				$scope.search = Children.search($scope.query);
			};

			$scope.refresh();


		});

})();