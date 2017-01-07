(function() {

	angular.module('BuscaAtivaEscolar').controller('LoginCtrl', function ($scope, $rootScope, $cookies, $location, Config, Auth) {

		console.log("[core] @Login");

		$rootScope.section = '';

		$scope.email = 'manager_sp@lqdi.net';
		$scope.password = 'demo';
		$scope.isLoading = false;

		$scope.endpoints = {
			allowed: Config.ALLOWED_ENDPOINTS,
			list: Config.API_ENDPOINTS
		};

		function onLoggedIn(session) {
			console.info("[login_ctrl] Logged in!", session);
			$location.path('/dashboard');
			$scope.isLoading = false;
		}

		function onError() {
			Modals.show(Modals.Alert('Usuário ou senha incorretos', 'Por favor, verifique os dados informados e tente novamente.'));
			$scope.isLoading = false;
		}

		$scope.setAPIEndpoint = function(endpointID) {
			Config.setEndpoint(endpointID);
			$cookies.put('FDENP_API_ENDPOINT', endpointID);
		};

		$scope.login = function() {
			$scope.isLoading = true;
			Auth.login($scope.email, $scope.password).then(onLoggedIn, onError);
		};

	});

})();