(function() {

	angular.module('BuscaAtivaEscolar').directive('appCitySelect', function (Cities) {

		var $scope;
		var $attrs;

		// TODO: fix this and replace repeated uib-typeaheads with this directive

		function init(scope, element, attrs) {
			$scope = scope;
			$attrs = attrs;

			$scope.$attrs = $attrs;
			$scope.fetchCities = fetch;
			$scope.renderSelectedCity = renderSelected;
		}

		function fetch(query) {
			var data = {name: query, $hide_loading_feedback: true};
			if($attrs.selectedUF) data.uf = $attrs.selectedUF;

			console.log("[create_alert] Looking for cities: ", data);

			return Cities.search(data).$promise.then(function (res) {
				return res.results;
			});
		};

		function renderSelected(city) {
			if(!city) return '';
			return city.uf + ' / ' + city.name;
		};

		return {
			link: init,
			replace: true,
			templateUrl: '/views/components/city_select.html'
		};
	});

})();