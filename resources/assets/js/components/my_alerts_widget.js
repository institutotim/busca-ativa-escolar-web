(function() {

	angular.module('BuscaAtivaEscolar').directive('myAlerts', function (moment, Identity, Platform, Alerts) {

		var alerts = {};

		function refresh() {
			Alerts.mine({}, function(data) {
				alerts = data.data;
			});
		}

		function init(scope, element, attrs) {
			scope.getAlerts = function() {
				return alerts;
			};
		}

		Platform.whenReady(function () {
			refresh();
		});

		return {
			link: init,
			replace: true,
			templateUrl: '/views/components/my_alerts.html'
		};
	});

})();