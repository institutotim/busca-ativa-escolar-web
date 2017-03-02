(function() {

	angular.module('BuscaAtivaEscolar').directive('casesMap', function (moment, $timeout, uiGmapGoogleMapApi, Identity, Platform, Children, Decorators) {

		var $scope = null;


		uiGmapGoogleMapApi.then(function (maps) {
			refresh();
		});

		function refresh() {
			Children.getMap({}, function(data) {
				$scope.coordinates = data.coordinates;
				$scope.mapCenter = data.center;
				$scope.mapZoom = data.center.zoom;
				$scope.mapReady = true;

				console.log("[widget.cases_map] Data loaded: ", data.coordinates, data.center);
			});
		}

		function onMarkerClick(marker, event, coords) {
			console.log('[widget.cases_map] Marker clicked: ', marker, event, coords);
		}

		function init(scope, element, attrs) {
			$scope = scope;
			scope.onMarkerClick = onMarkerClick;
			scope.isMapReady = function() {
				return $scope.mapReady;
			};

			scope.reloadMap = function() {
				$scope.mapReady = false;
				$timeout(function() {
					$scope.mapReady = true;
				}, 10);
			};
		}

		return {
			link: init,
			replace: true,
			templateUrl: '/views/components/cases_map.html'
		};
	});

})();