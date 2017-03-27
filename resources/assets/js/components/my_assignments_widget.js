(function() {

	angular.module('BuscaAtivaEscolar').directive('myAssignments', function (moment, Identity, Platform, Children, Decorators) {

		function init(scope, element, attrs) {
			scope.Decorators = Decorators;
			scope.children = [];

			var isReady = false;

			scope.refresh = function() {
				console.log("[widget.my_assignments] Loading assignments...");
				isReady = false;

				Children.search({assigned_user_id: Identity.getCurrentUserID()}, function(data) {
					console.log("[widget.my_assignments] Loaded: ", data.results);

					scope.children = data.results;
					isReady = true;
				});
			};

			scope.getChildren = function() {
				return scope.children;
			};

			scope.isReady = function() {
				return isReady;
			};

			scope.hasAssignments = function() {
				return (scope.children && scope.children.length > 0);
			};

			Platform.whenReady(function () {
				scope.refresh();
			});
		}

		return {
			link: init,
			scope: true,
			replace: true,
			templateUrl: '/views/components/my_assignments.html'
		};
	});

})();