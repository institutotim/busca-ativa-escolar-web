(function() {
	angular
		.module('BuscaAtivaEscolar')
		.service('TrackPendingRequests', function ($q, $rootScope, API) {

			this.request = function (config) {

				API.pushRequest();

				return config;
			};

			this.response = function (response) {

				API.popRequest();

				return response;
			};

		});

})();