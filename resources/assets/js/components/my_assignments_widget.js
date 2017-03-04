(function() {

	angular.module('BuscaAtivaEscolar').directive('myAssignments', function (moment, Identity, Platform, Children, Decorators) {

		var children = [];

		var isReady = false;

		function refresh() {
			Children.search({assigned_user_id: Identity.getCurrentUserID()}, function(data) {
				children = data.results;
			});
		}

		function init(scope, element, attrs) {
			scope.Decorators = Decorators;
			scope.refresh = refresh;
			scope.getChildren = function() {
				return children;
			};

			scope.isReady = function() {
				return isReady;
			};

			scope.hasAssignments = function() {
				return (children && children.length > 0);
			};

			Platform.whenReady(function () {
				refresh();
			});
		}

		return {
			link: init,
			replace: true,
			templateUrl: '/views/components/my_assignments.html'
		};
	});

})();