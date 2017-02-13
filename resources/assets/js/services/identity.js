(function() {

	angular.module('BuscaAtivaEscolar').service('Identity', function ($q, $rootScope, $location, $localStorage) {

		var tokenProvider = null;
		var userProvider = null;

		var debugCurrentType = "coordenador_operacional";

		$localStorage.$default({
			identity: {
				is_logged_in: false,
				current_user: {},
			}
		});

		function setup() {
			console.info("[core.identity] Setting up identity service...");
			refreshIdentity();
		}

		function setTokenProvider(callback) {
			tokenProvider = callback;
		}

		function setUserProvider(callback) {
			userProvider = callback;
		}

		function provideToken() {

			if(!tokenProvider) {
				console.error("[core.identity] No token provider registered! Rejecting...");
				return $q.reject('no_token_provider');
			}

			return tokenProvider();
		}

		function refreshIdentity() {
			if(!isLoggedIn() || !$localStorage.session.user_id) {
				console.log("[core.identity] No identity found in session, user is logged out");
				$rootScope.$broadcast('Identity.ready');
				return;
			}

			console.log("[core.identity] Refreshing current identity details...");

			$localStorage.identity.current_user = userProvider($localStorage.session.user_id, function(details) {
				console.log("[core.identity] Identity details ready: ", details);
				$rootScope.$broadcast('Identity.ready');
			})
		}

		function getCurrentUser() {
			return ($localStorage.identity.current_user && $localStorage.identity.current_user.id)
				? $localStorage.identity.current_user
				: {};
		}

		function setCurrentUser(user) {
			if(!user) clearSession();

			$rootScope.$broadcast('identity.connected', {user: user});

			console.log("[identity] Connected user: ", user);

			$localStorage.identity.is_logged_in = true;
			$localStorage.identity.current_user = user;

			refreshIdentity();
		}

		function can(operation) {
			if(!isLoggedIn()) return false;
			return true;

			// TODO: back-end Fractal Transformer will populate this
			return getCurrentUser().can.indexOf(operation) !== -1;
		}

		function getType() {
			if(isLoggedIn()) return getCurrentUser().type;
			return debugCurrentType;
		}

		function debugUserType(type) {
			console.log("[identity::debug] Faking user type: ", type);
			debugCurrentType = type;
			$localStorage.identity.current_user.type = type;
		}

		function isLoggedIn() {
			return $localStorage.identity.is_logged_in;
		}

		function disconnect() {
			clearSession();
			$rootScope.$broadcast('identity.disconnect');
			$location.path('/login');
		}

		function clearSession() {
			console.log("[identity] Clearing current session");

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
			setup: setup,
			setTokenProvider: setTokenProvider,
			setUserProvider: setUserProvider,
			provideToken: provideToken,
			disconnect: disconnect,
			debugUserType: debugUserType
		}

	});

})();