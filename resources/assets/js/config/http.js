(function() {
	identify('config', 'http.js');

	angular.module('BuscaAtivaEscolar').config(function ($httpProvider) {
		$httpProvider.interceptors.push('TrackPendingRequests');
		$httpProvider.interceptors.push('AddAuthorizationHeadersInterceptor');
	});

})();