(function() {
	angular.module('BuscaAtivaEscolar').run(function ($rootScope, $state, Identity) {
		$rootScope.$on('$stateChangeStart', handleStateChange);

		function handleStateChange(event, toState, toParams, fromState, fromParams, options) {

			$rootScope.previousState = fromState;
			$rootScope.previousStateParams = fromParams;
			$rootScope.currentState = toState;
			$rootScope.currentStateParams = toParams;
		}

	});
})();