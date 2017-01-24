(function() {
	angular
		.module('BuscaAtivaEscolar')
		.factory('Cities', function Cities(API, Identity, $resource) {

			let headers = {};

			return $resource(API.getURI('cities/:id'), {id: '@id'}, {
				find: {method: 'GET', headers: headers}
			});

		});
})();