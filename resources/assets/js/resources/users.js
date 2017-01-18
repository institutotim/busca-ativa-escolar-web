(function() {
	angular
		.module('BuscaAtivaEscolar')
		.factory('Users', function Users(API, $resource) {

			let headers = API.REQUIRE_AUTH;

			return $resource(API.getURI('users/:id'), {id: '@id', with: '@with'}, {
				find: {method: 'GET', headers: headers},
				update: {method: 'POST', headers: headers}
			});

		});
})();