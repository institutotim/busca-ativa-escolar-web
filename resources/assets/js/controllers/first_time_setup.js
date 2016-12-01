(function() {

	angular.module('BuscaAtivaEscolar').controller('FirstTimeSetupCtrl', function ($scope, $rootScope, $window, Modals, MockData, Identity) {

		$rootScope.section = 'first_time_setup';

		$scope.identity = Identity;
		$scope.step = 3; // Steps 1 and 2 are from sign up
		$scope.isEditing = false;

		$scope.causes = MockData.alertReasons;
		$scope.newGroupName = "";
		$scope.groups = [
			'Secretaria dos Transportes',
			'Secretaria de Assistência Social',
			'Secretaria da Educação',
			'Secretaria dos Direitos Humanos e Cidadania',
			'Secretaria da Saúde'
		];

		Identity.clearLogin();

		$scope.goToStep = function (step) {
			$scope.step = step;
			$window.scrollTo(0, 0);
		};

		$scope.nextStep = function() {
			$scope.step++;
			$window.scrollTo(0, 0);
			if($scope.step > 6) $scope.step = 6;
		};

		$scope.prevStep = function() {
			$scope.step--;
			$window.scrollTo(0, 0);
			if($scope.step < 3) $scope.step = 3;
		};

		$scope.removeGroup = function(i) {
			$scope.groups.splice(i, 1);
		};

		$scope.addGroup = function() {
			$scope.groups.push($scope.newGroupName);
			$scope.newGroupName = "";
		};

		$scope.finish = function() {
			Modals.show(Modals.Confirm(
				'Tem certeza que deseja prosseguir com o cadastro?',
				'Os dados informados poderão ser alterados por você e pelos gestores na área de Configurações.'
			)).then(function(res) {
				Identity.login();
				location.hash = '/dashboard';
			});
		};

	});

})();