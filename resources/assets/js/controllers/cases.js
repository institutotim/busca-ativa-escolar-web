(function() {

	angular.module('BuscaAtivaEscolar').controller('CasesCtrl', function ($scope, MockData, Identity) {

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