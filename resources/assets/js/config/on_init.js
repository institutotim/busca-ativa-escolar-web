(function() {
	identify('config', 'on_init.js');

	angular.module('BuscaAtivaEscolar').run(function ($cookies, Config, StaticData) {
		Config.setEndpoint($cookies.get('FDENP_API_ENDPOINT') || Config.CURRENT_ENDPOINT);

		StaticData.refresh();

		$.material.init();
	})

})();