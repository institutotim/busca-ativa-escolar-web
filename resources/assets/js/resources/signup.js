(function() {
	angular
		.module('BuscaAtivaEscolar')
		.factory('SignUps', function SignUps(API, Identity, $resource) {

			var authHeaders = API.REQUIRE_AUTH;
			var headers = {};

			return $resource(API.getURI('signups/:id'), {id: '@id'}, {
				find: {method: 'GET', headers: authHeaders},

				getPending: {url: API.getURI('signups/pending'), method: 'POST', isArray: false, headers: authHeaders},
				approve: {url: API.getURI('signups/:id/approve'), method: 'POST', headers: authHeaders},
				reject: {url: API.getURI('signups/:id/reject'), method: 'POST', headers: authHeaders},

				resendNotification: {url: API.getURI('signups/:id/resend_notification'), method: 'POST', headers: authHeaders},
				completeSetup: {url: API.getURI('signups/complete_setup'), method: 'POST', headers: authHeaders},

				register: {url: API.getURI('signups/register'), method: 'POST', headers: headers},
				getViaToken: {url: API.getURI('signups/via_token/:id'), method: 'GET', headers: headers},
				complete: {url: API.getURI('signups/:id/complete'), method: 'POST', headers: headers},
			});

		});
})();