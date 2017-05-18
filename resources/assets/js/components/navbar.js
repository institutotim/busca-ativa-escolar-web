(function() {

	angular.module('BuscaAtivaEscolar').directive('appNavbar', function (Identity, Notifications, Platform, Auth) {

		function init(scope, element, attrs) {
			scope.identity = Identity;
			scope.auth = Auth;
			scope.notifications = Notifications;
			scope.platform = Platform;

			scope.showNotifications = true;

			scope.isHidden = function() {
				return !!Platform.getFlag('HIDE_NAVBAR');
			};

			scope.onMenuToggle = function(isOpen) {
				if(isOpen) Notifications.refresh();
			};

			scope.toggleNotifications = function($event) {
				scope.showNotifications = !scope.showNotifications;

				$event.stopPropagation();
				$event.stopImmediatePropagation();
				$event.preventDefault();

				return false;
			};
		}

		return {
			link: init,
			replace: true,
			templateUrl: '/views/navbar.html'
		};
	});

})();