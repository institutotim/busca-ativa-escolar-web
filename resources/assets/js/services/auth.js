(function() {
	angular
		.module('BuscaAtivaEscolar')
		.service('Auth', function Auth($q, $rootScope, $localStorage, $http, $resource, Modals, API, Identity, Config) {

			var self = this;

			$localStorage.$default({
				session: {
					user_id: null,
					access_token: null,
					refresh_token: null,
					token_expires_at: null,
					refresh_expires_at: null
				}
			});

			function requireLogin(reason) {
				return Modals.show(Modals.Login(reason, false));
			}

			function provideToken() {

				console.log("[auth::token.provide] Providing token, session=", $localStorage.session);

				// Isn't even logged in
				if(!Identity.isLoggedIn()) return requireLogin('Você precisa fazer login para realizar essa ação!');

				// Has valid token
				if(!isTokenExpired()) return $q.resolve($localStorage.session.access_token);

				console.log("[auth::token.provide] Token expired! Refreshing...");

				// Is logged in, but both access and refresh token are expired
				if(isRefreshExpired()) {
					console.log("[auth::token.provide] Refresh token also expired! Logging out...");
					return requireLogin('Sua sessão expirou! Por favor, entre seus dados novamente para continuar.');
				}

				// Is logged in, access token expired but refresh token still valid
				return self.refresh().then(function (session) {
					console.log("[auth::token.provide] Refreshed, new tokens: ", session);
					return session.access_token;
				});

			}

			function isTokenExpired() {
				var now = (new Date()).getTime();
				return !Identity.isLoggedIn() || (now >= $localStorage.session.token_expires_at);
			}

			function isRefreshExpired() {
				var now = (new Date()).getTime();
				return !Identity.isLoggedIn() || (now >= $localStorage.session.refresh_expires_at);
			}

			function handleAuthResponse(response) {

				API.popRequest();

				if(response.status !== 200) {
					console.log("[auth::login] Rejecting Auth response! Status= ", response.status);
					return $q.reject(response.data);
				}

				$localStorage.session.access_token = response.data.access_token;
				$localStorage.session.refresh_token = response.data.refresh_token;
				$localStorage.session.token_expires_at = (new Date()).getTime() + (Config.TOKEN_EXPIRES_IN * 1000);
				$localStorage.session.refresh_expires_at = (new Date()).getTime() + (Config.REFRESH_EXPIRES_IN * 1000);

				// Auth.refresh doesn't return user_id, so we can't always set it
				if(response.data.user_id) $localStorage.session.user_id = response.data.user.id;

				Identity.setCurrentUser(response.data.user);

				return $localStorage.session;
			}

			function handleAuthError(response) {

				API.popRequest();

				console.error("[auth::login] API error: ", response);

				if(!response || !response.status || !API.isUseableError(response.status)) {
					console.warn("[auth::login] Error code ", response.status, " not in list of useable errors: ", useableErrors);
					$rootScope.$broadcast('auth.error', response);
				}

				throw (response.data) ? response.data : response;
			}

			this.provideToken = provideToken;
			this.requireLogin = requireLogin;
			this.isTokenExpired = isTokenExpired;
			this.isRefreshExpired = isRefreshExpired;

			this.isLoggedIn = function() {
				return Identity.isLoggedIn();
			};

			this.logout = function() {
				$localStorage.session.user_id = null;
				$localStorage.session.access_token = null;
				$localStorage.session.refresh_token = null;
				$localStorage.session.token_expires_at = null;
				$localStorage.session.refresh_expires_at = null;

				Identity.clearSession();
			};

			this.login = function(email, password) {

				let tokenRequest = {
					grant_type: 'login',
					email: email,
					password: password
				};

				let options = {
					accept: 'application/json',
				};

				API.pushRequest();

				return $http
					.post(API.getTokenURI(), tokenRequest, options)
					.then(handleAuthResponse, handleAuthError);
			};

			this.refresh = function() {

				let tokenRequest = {
					grant_type: 'refresh',
					refresh_token: $localStorage.session.refresh_token
				};

				let options = {
					accept: 'application/json',
				};

				API.pushRequest();

				return $http
					.post(API.getTokenURI(), tokenRequest, options)
					.then(handleAuthResponse, handleAuthError);
			};

		})
		.run(function (Identity, Auth) {
			Identity.setTokenProvider(Auth.provideToken);
		})
})();