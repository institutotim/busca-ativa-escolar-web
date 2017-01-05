(function() {
	angular
		.module('BuscaAtivaEscolar')
		.factory('Children', function Children(API, Identity, $resource) {

			let headers = API.REQUIRE_AUTH;

			return $resource(API.getURI('children/:id'), {id: '@id'}, {
				get: {method: 'GET', headers: headers},
				save: {method: 'POST', headers: headers},
				query: {method: 'GET', isArray: true, headers: headers},
				remove: {method: 'DELETE', headers: headers},
				delete: {method: 'DELETE', headers: headers}
			});

		});
})();