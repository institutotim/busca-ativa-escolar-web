(function() {

	angular.module('BuscaAtivaEscolar').directive('myAlerts', function (moment, Identity, Platform, Alerts) {

		var alerts = [];
		var isReady = false;

		function refresh() {
			Alerts.mine({}, function(data) {
				alerts = data.data;
				isReady = true;
			});
		}

		function init(scope, element, attrs) {

			scope.getAlerts = function() {
				return alerts;
			};

			scope.isReady = function() {
				return isReady;
			};

			scope.hasAlerts = function() {
				return (alerts && alerts.length > 0);
			};

			Platform.whenReady(function () {
				refresh();
			});
		}

		return {
			link: init,
			replace: true,
			templateUrl: '/views/components/my_alerts.html'
		};
	});

})();