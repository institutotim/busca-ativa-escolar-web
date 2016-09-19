(function() {

	angular.module('BuscaAtivaEscolar').controller('UserSearchCtrl', function ($scope, $rootScope, MockData, Identity) {

		$rootScope.section = 'users';
		$scope.identity = Identity;

		$scope.cities = MockData.cities;
		$scope.states = MockData.states;
		$scope.groups = MockData.groups;

		$scope.range = function (start, end) {
			var arr = [];

			for(var i = start; i <= end; i++) {
				arr.push(i);
			}

			return arr;
		}

	});

})();