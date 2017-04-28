(function() {
	angular
		.module('BuscaAtivaEscolar')
		.factory('SystemHealth', function SystemHealth(API, Identity, $resource) {

			var authHeaders = API.REQUIRE_AUTH;

			return $resource(API.getURI('maintenance/system_health'), {}, {
				getStats: {method: 'GET', headers: authHeaders},
			});

		});
})();