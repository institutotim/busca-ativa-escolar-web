(function() {

	angular.module('BuscaAtivaEscolar').controller('CitySearchCtrl', function ($scope, $rootScope, MockData, Identity) {

		$rootScope.section = 'cities';
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