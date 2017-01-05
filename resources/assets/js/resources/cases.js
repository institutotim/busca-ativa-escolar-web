(function() {
	angular
		.module('BuscaAtivaEscolar')
		.factory('Cases', function Cases(API, Identity, $resource) {

			let headers = API.REQUIRE_AUTH;

			return $resource(API.getURI('cases/:id'), {id: '@id'}, {
				get: {method: 'GET', headers: headers},
				save: {method: 'POST', headers: headers},
				query: {method: 'GET', isArray: true, headers: headers},
				remove: {method: 'DELETE', headers: headers},
				delete: {method: 'DELETE', headers: headers}
			});

		});
})();