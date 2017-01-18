(function() {

	angular.module('BuscaAtivaEscolar').directive('appNavbar', function (Identity) {

		function init(scope, element, attrs) {
			scope.identity = Identity;
			scope.showNotifications = true;

			scope.toggleNotifications = function($event) {
				scope.showNotifications = !scope.showNotifications;

				$event.stopPropagation();
				$event.stopImmediatePropagation();
				$event.preventDefault();

				return false;
			}
		}

		return {
			link: init,
			replace: true,
			templateUrl: '/views/navbar.html'
		};
	});

})();