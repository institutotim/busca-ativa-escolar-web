(function() {

	angular.module('BuscaAtivaEscolar').controller('CaseSearchCtrl', function ($scope, $rootScope, MockData, Identity) {

		$rootScope.section = 'cases';
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