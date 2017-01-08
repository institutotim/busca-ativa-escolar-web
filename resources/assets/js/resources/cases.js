(function() {
	angular
		.module('BuscaAtivaEscolar')
		.factory('Cases', function Cases(API, Identity, $resource) {

			let headers = API.REQUIRE_AUTH;

			return $resource(API.getURI('cases/:id'), {id: '@id', with: '@with'}, {
				find: {method: 'GET', headers: headers},
				update: {method: 'POST', headers: headers}
			});

		});
})();