(function() {
	angular
		.module('BuscaAtivaEscolar')
		.factory('Tenants', function Tenants(API, Identity, $resource) {

			let authHeaders = API.REQUIRE_AUTH;
			let headers = {};

			return $resource(API.getURI('tenants/:id'), {id: '@id'}, {
				all: {url: API.getURI('tenants/all'), method: 'GET', headers: authHeaders, params: {'with': 'city,political_admin,operational_admin'}},
				getSettings: {url: API.getURI('settings/tenant'), method: 'GET', headers: authHeaders},
				updateSettings: {url: API.getURI('settings/tenant'), method: 'PUT', headers: authHeaders},
				getRecentActivity: {url: API.getURI('tenants/recent_activity'), method: 'GET', headers: authHeaders},
				find: {method: 'GET', headers: headers}
			});

		});
})();