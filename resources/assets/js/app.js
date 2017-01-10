(function() {
	identify('core', 'app.js');

	angular
		.module('BuscaAtivaEscolar', [
			'ngToast',
			'ngAnimate',
			'ngCookies',
			'ngResource',
			'ngStorage',

			'BuscaAtivaEscolar.Config',

			'angularMoment',
			'highcharts-ng',

			'ui.router',
			'ui.bootstrap',
			'ui.select',
			'ui.utils.masks',
		])
})();