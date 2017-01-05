(function() {

	angular.module('BuscaAtivaEscolar').controller('DeveloperCtrl', function ($scope, $rootScope, $localStorage, Notifications, Children, Auth) {

		var messages = [
			'asdasd asd as das das dsd fasdf as',
			'sdg sdf gfdgh dfthdfg hdfgh dfgh ',
			'rtye rtertg heriufh iurfaisug faisugf as',
			'ksjf hkdsuf oiaweua bfieubf iasuef iauegh',
			'jkb viubiurbviesubvisueb iseubv',
			'askjdfh aiufeiuab biausf biu iubfa iub fseiuse bfsaef'
		];

		$scope.storage = $localStorage;

		$scope.testNotification = function (messageClass) {
			Notifications.push(messageClass, messages.clone().shuffle().pop())
		};

		$scope.login = function() {
			Auth.requireLogin();
		};

		$scope.logout = function() {
			Auth.logout();
		};

		$scope.testGetChildren = function() {
			var child_id = 'b9d1d8a0-ce23-11e6-98e6-1dc1d3126c4e';
			var tenant_id = 'b0838f00-cd55-11e6-b19b-757d3a457db3';

			$scope.child = Children.get({id: child_id});
		};

	});

})();