(function() {

	angular.module('BuscaAtivaEscolar')
		.config(function ($stateProvider) {
			$stateProvider.state('case_browser', {
				url: '/cases',
				templateUrl: '/views/cases/list.html',
				controller: 'CaseSearchCtrl'
			})
		})
		.controller('CaseSearchCtrl', function ($scope, Children) {

			$scope.Children = Children;
			$scope.list = Children.get();

		});

})();