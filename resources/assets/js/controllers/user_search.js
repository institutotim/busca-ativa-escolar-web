(function() {

	angular.module('BuscaAtivaEscolar').controller('UserSearchCtrl', function ($scope, $rootScope, MockData, Identity) {

		$rootScope.section = 'users';
		$scope.identity = Identity;

		$scope.range = function (start, end) {
			var arr = [];

			for(var i = start; i <= end; i++) {
				arr.push(i);
			}

			return arr;
		}

	});

})();