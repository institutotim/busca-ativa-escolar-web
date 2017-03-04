(function() {
	angular
		.module('BuscaAtivaEscolar')
		.service('InjectAPIEndpointInterceptor', function ($q, $rootScope, Config) {

			this.request = function (config) {

				if(!config.url) return config;

				config.url = config.url.replace(/@@API@@/g, Config.getAPIEndpoint());
				config.url = config.url.replace(/@@TOKEN@@/g, Config.getTokenEndpoint());

				return config;

			};

		});

})();