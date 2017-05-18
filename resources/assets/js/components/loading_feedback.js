(function() {

	angular.module('BuscaAtivaEscolar').directive('appLoadingFeedback', function (API) {

		function init(scope, element, attrs) {
			scope.isVisible = API.hasOngoingRequests;
		}

		return {
			link: init,
			replace: true,
			templateUrl: '/views/components/loading_feedback.html'
		};
	});

})();