(function() {

	angular.module('BuscaAtivaEscolar').directive('myAssignments', function (moment, Identity, Platform, Children, Decorators) {

		var children = {};

		function refresh() {
			Children.search({assigned_user_id: Identity.getCurrentUserID()}, function(data) {
				children = data.results;
			});
		}

		function init(scope, element, attrs) {
			scope.Decorators = Decorators;
			scope.getChildren = function() {
				return children;
			};
		}

		Platform.whenReady(function () {
			refresh();
		});

		return {
			link: init,
			replace: true,
			templateUrl: '/views/components/my_assignments.html'
		};
	});

})();