(function() {
	angular
		.module('BuscaAtivaEscolar')
		.factory('Children', function Children(API, Identity, $resource) {

			var headers = API.REQUIRE_AUTH;

			var repository = $resource(API.getURI('children/:id'), {id: '@id'}, {
				get: {method: 'GET', headers: headers},
				save: {method: 'POST', headers: headers},
				query: {method: 'GET', isArray: true, headers: headers},
				remove: {method: 'DELETE', headers: headers},
				delete: {method: 'DELETE', headers: headers}
			});

			repository.decorate = {
				parents: function(child) {
					return (child.mother_name || '')
						+ ((child.mother_name && child.father_name) ? ' / ' : '')
						+ (child.father_name || '');
				}
			};

			return repository;

		});
})();