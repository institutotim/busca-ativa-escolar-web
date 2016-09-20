(function() {

	angular.module('BuscaAtivaEscolar').service('Notifications', function ($rootScope, $http) {

		$rootScope.notifications = [];

		function push(messageClass, messageBody) {
			$rootScope.notifications.push({
				class: messageClass,
				contents: messageBody,
				hide: hide,
				open: open
			});
		}

		function open($event, index) {
			location.hash = '#/cases';
			return false;
		}

		function hide($event, index) {
			$rootScope.notifications.splice(index, 1);

			$event.stopPropagation();
			$event.stopImmediatePropagation();
			$event.preventDefault();

			return false;
		}

		function get() {
			return $rootScope.notifications;
		}

		function clear() {
			$rootScope.notifications = [];
		}

		return {
			push: push,
			get: get,
			clear: clear
		}

	});

})();