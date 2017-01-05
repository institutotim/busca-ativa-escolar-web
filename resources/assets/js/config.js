(function() {
	console.log("[core.load] Loaded: config.js");

	angular
		.module('BuscaAtivaEscolar.Config', [])
		.factory('Config', function Config($rootScope) {

			numeral.language('pt-br');
			moment.locale('pt-br');

			var config = {

				BUILD_PREFIX: 'b010.', // Build prefix for local storage keys; one-up this whenever the local storage structure is outdated

				API_ENDPOINTS: {
					local_http: {
						label: 'V1 Local - Homestead (Insecure)',
						api: 'http://api.busca-ativa-escolar.local/api/v1/',
						token: 'http://api.busca-ativa-escolar.local/api/auth/token',
					},
					homolog_http: {
						label: 'V1 Homolog - web4-lqdi (Insecure)',
						api: 'http://api.busca-ativa-escolar.dev.lqdi.net/api/v1/',
						token: 'http://api.busca-ativa-escolar.dev.lqdi.net/api/auth/token',
					}
				},

				TOKEN_EXPIRES_IN: 3600, // 1 hour
				REFRESH_EXPIRES_IN: 1209600, // 2 weeks

				ALLOWED_ENDPOINTS: ['local_http', 'homolog_http'],
				CURRENT_ENDPOINT: 'local_http'

			};

			config.setEndpoint = function(endpoint) {
				if(config.ALLOWED_ENDPOINTS.indexOf(endpoint) === -1) {
					console.error("[Core.Config] Cannot set endpoint to ", endpoint,  ", not in valid endpoints list: ", config.ALLOWED_ENDPOINTS);
					return;
				}

				config.CURRENT_ENDPOINT = endpoint;
			};

			config.getAPIEndpoint = function() {
				return config.API_ENDPOINTS[config.CURRENT_ENDPOINT].api
			};

			config.getTokenEndpoint = function() {
				return config.API_ENDPOINTS[config.CURRENT_ENDPOINT].token
			};

			return $rootScope.config = config;

		});

})();