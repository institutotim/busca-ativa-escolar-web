(function() {
	angular
		.module('BuscaAtivaEscolar')
		.factory('UserNotifications', function UserNotifications(API, Identity, $resource) {

			var authHeaders = API.REQUIRE_AUTH;

			return $resource(API.getURI('notifications/:id'), {id: '@id'}, {
				find: {method: 'GET', headers: authHeaders},

				getUnread: {url: API.getURI('notifications/unread'), method: 'GET', isArray: false, headers: authHeaders},
				markAsRead: {url: API.getURI('notifications/:id/mark_as_read'), method: 'POST', headers: authHeaders},
			});

		});
})();