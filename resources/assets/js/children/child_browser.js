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

			$scope.list = Children.search();

		});

})();