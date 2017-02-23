(function() {

	angular.module('BuscaAtivaEscolar').directive('recentActivity', function (moment, Platform, Tenants) {

		var log = {};

		function refresh() {
			return Tenants.getRecentActivity({max: 4}, function (data) {
				log = data.data;
			});
		}

		function init(scope, element, attrs) {
			scope.getActivity = function() {
				return log;
			};
		}

		Platform.whenReady(function () {
			refresh();
		});

		return {
			link: init,
			replace: true,
			templateUrl: '/views/components/activity_feed.html'
		};
	});

})();