(function() {
	identify('config', 'on_init.js');

	angular.module('BuscaAtivaEscolar').run(function ($cookies, Config) {
		Config.setEndpoint($cookies.get('FDENP_API_ENDPOINT') || Config.CURRENT_ENDPOINT);

		$.material.init();
	})

})();