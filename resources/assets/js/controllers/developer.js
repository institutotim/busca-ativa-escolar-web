(function() {

	angular.module('BuscaAtivaEscolar').controller('DeveloperCtrl', function ($scope, $rootScope, Notifications) {

		var messages = [
			'asdasd asd as das das dsd fasdf as',
			'sdg sdf gfdgh dfthdfg hdfgh dfgh ',
			'rtye rtertg heriufh iurfaisug faisugf as',
			'ksjf hkdsuf oiaweua bfieubf iasuef iauegh',
			'jkb viubiurbviesubvisueb iseubv',
			'askjdfh aiufeiuab biausf biu iubfa iub fseiuse bfsaef'
		];

		$scope.testNotification = function (messageClass) {
			Notifications.push(messageClass, messages.clone().shuffle().pop())
		}

	});

})();