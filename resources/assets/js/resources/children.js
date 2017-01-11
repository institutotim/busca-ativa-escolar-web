(function() {
	angular
		.module('BuscaAtivaEscolar')
		.factory('Children', function Children(API, Identity, $resource) {

			var headers = API.REQUIRE_AUTH;

			return $resource(API.getURI('children/:id'), {id: '@id'}, {
				find: {method: 'GET', headers: headers},
				update: {method: 'POST', headers: headers},
				search: {method: 'GET', isArray: false, headers: headers},
				spawnFromAlert: {method: 'POST', headers: headers}
			});
		});
})();