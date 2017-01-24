(function() {
	angular
		.module('BuscaAtivaEscolar')
		.factory('Tenants', function Tenants(API, Identity, $resource) {

			let headers = {};

			return $resource(API.getURI('tenants/:id'), {id: '@id'}, {
				find: {method: 'GET', headers: headers}
			});

		});
})();