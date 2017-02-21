(function() {
	angular
		.module('BuscaAtivaEscolar')
		.factory('SignUps', function SignUps(API, Identity, $resource) {

			let authHeaders = API.REQUIRE_AUTH;
			let headers = {};

			return $resource(API.getURI('signups/:id'), {id: '@id'}, {
				find: {method: 'GET', headers: authHeaders},

				getPending: {url: API.getURI('signups/pending'), method: 'GET', headers: authHeaders},
				approve: {url: API.getURI('signups/:id/approve'), method: 'POST', headers: authHeaders},
				reject: {url: API.getURI('signups/:id/reject'), method: 'POST', headers: authHeaders},

				register: {url: API.getURI('signups/register'), method: 'POST', headers: headers},
				getViaToken: {url: API.getURI('signups/via_token/:id'), method: 'GET', headers: headers},
			});

		});
})();