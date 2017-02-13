(function() {
	angular
		.module('BuscaAtivaEscolar')
		.factory('Tenants', function Tenants(API, Identity, $resource) {

			let authHeaders = API.REQUIRE_AUTH;
			let headers = {};

			return $resource(API.getURI('tenants/:id'), {id: '@id'}, {
				all: {url: API.getURI('tenants/all'), method: 'GET', headers: authHeaders, params: {'with': 'city,political_admin,operational_admin'}},
				find: {method: 'GET', headers: headers}
			});

		});
})();