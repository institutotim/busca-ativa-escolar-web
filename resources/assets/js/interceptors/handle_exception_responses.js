(function() {
	angular
		.module('BuscaAtivaEscolar')
		.service('HandleExceptionResponsesInterceptor', function () {

			function handleResponse(response) {

				if(!response) return response;
				if(!response.data) return response;
				if(!response.data.reason) return response;
				if(response.data.reason !== 'exception') return response;

				if(response.data.exception.stack) {
					console.log('[interceptors.api_exception] [debug=on] API error: ', response.data.exception.message);
					console.log('[interceptors.api_exception] [debug=on] Error stack: ', response.data.exception.stack);
					return response;
				}

				console.log('[interceptors.api_exception] [debug=off] API error: ', response.data.exception);

				return response;

			}

			this.response = handleResponse;
			this.responseError = handleResponse;

		});

})();