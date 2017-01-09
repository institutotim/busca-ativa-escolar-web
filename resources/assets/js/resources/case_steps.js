(function() {
	angular
		.module('BuscaAtivaEscolar')
		.factory('CaseSteps', function CaseSteps(API, Identity, $resource) {

			var headers = API.REQUIRE_AUTH;

			var repository = $resource(API.getURI('steps/:type/:id'), {id: '@id', type: '@type', with: '@with'}, {
				find: {method: 'GET', headers: headers},
				update: {method: 'POST', headers: headers}
			});

			repository.where = {
				idEquals: function(id) {
					return function(item) { return item.id === id; }
				},

				caseCurrentStepIdEquals: function(id) {
					return function(item) { return item.current_step_id === id; }
				}
			};

			return repository;

		});
})();