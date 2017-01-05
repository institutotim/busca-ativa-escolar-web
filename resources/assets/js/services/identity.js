(function() {

	angular.module('BuscaAtivaEscolar').service('Identity', function ($q, $rootScope, $localStorage) {

		var tokenProvider = null;

		$localStorage.$default({
			identity: {
				is_logged_in: false,
				current_user: {},
			}
		});

		function setTokenProvider(callback) {
			tokenProvider = callback;
		}

		function provideToken() {
			if(!tokenProvider) return $q.reject('no_token_provider');
			return tokenProvider();
		}

		function getCurrentUser() {
			return $localStorage.identity.current_user || {};
		}

		function setCurrentUser(user) {
			if(!user) clearSession();

			$rootScope.$broadcast('identity.connected', {user: user});

			$localStorage.identity.is_logged_in = true;
			$localStorage.identity.current_user = user;
		}

		function can(operation) {
			if(!isLoggedIn()) return false;
			return true;

			// TODO: back-end Fractal Transformer will populate this
			return getCurrentUser().can.indexOf(operation) !== -1;
		}

		function getType() {
			return getCurrentUser().type;
		}

		function isLoggedIn() {
			return $localStorage.identity.is_logged_in;
		}

		function clearSession() {
			$rootScope.$broadcast('identity.disconnected');

			$localStorage.identity.is_logged_in = false;
			$localStorage.identity.current_user = {};
		}

		return {
			getCurrentUser: getCurrentUser,
			setCurrentUser: setCurrentUser,
			getType: getType,
			can: can,
			isLoggedIn: isLoggedIn,
			clearSession: clearSession,
			setTokenProvider: setTokenProvider,
			provideToken: provideToken
		}

	});

})();