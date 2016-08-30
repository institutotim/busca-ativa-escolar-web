(function() {

	angular.module('BuscaAtivaEscolar').controller('CaseViewCtrl', function ($scope, $rootScope, MockData, Identity) {

		$rootScope.section = 'cases';

		$scope.identity = Identity;
		$scope.reasons = MockData.alertReasons;

		$scope.isPanelOpen = {};
		$scope.currentStep = null;
		$scope.currentForm = null;
		$scope.message = "";
		$scope.messages = [];

		$scope.steps = {
			'pesquisa': {id: 'pesquisa', name: 'Pesquisa', opens: ['info', 'location']},
			'parecer': {id: 'parecer', name: 'Parecer', opens: ['parecer']},
			'consolidacao': {id: 'consolidacao', name: 'Consolidação'},
			'reinsercao': {id: 'reinsercao', name: 'Reinserção'},
			'1obs': {id: '1obs', name: '1a observação'},
			'2obs': {id: '2obs', name: '2a observação'},
			'3obs': {id: '3obs', name: '3a observação'},
			'4obs': {id: '4obs', name: '4a observação'}
		};

		function init() {
			$scope.setCaseStep('pesquisa');
			$scope.openForm('pesquisa');
		}

		$scope.setCaseStep = function(step) {
			$scope.currentStep = step;
			$scope.isPanelOpen = {};

			for(var i in $scope.steps[step].opens) {
				$scope.isPanelOpen[$scope.steps[step].opens[i]] = true;
			}
		};

		$scope.sendMessage = function () {
			$scope.messages.push({
				user: Identity.getCurrentUser(),
				body: $scope.message
			});

			$scope.message = "";
		};

		$scope.openForm = function(form) {

			if(form != 'consolidada' && !$scope.isPastStep(form)) {
				alert("Etapa ainda não liberada!");
				return;
			}

			$scope.currentForm = form;
			$scope.isPanelOpen = {};

			if(form == 'consolidada') {
				$scope.isPanelOpen = {info: true, location: true, parecer: true};
				return;
			}

			for(var i in $scope.steps[form].opens) {
				$scope.isPanelOpen[$scope.steps[form].opens[i]] = true;
			}
		};

		$scope.togglePanel = function(panel) {
			$scope.isPanelOpen[panel] = !$scope.isPanelOpen[panel];
		};

		$scope.isOpen = function(panel) {
			return $scope.isPanelOpen[panel] || false;
		};

		$scope.getFormName = function() {
			if($scope.currentForm == "consolidada") return "com dados consolidados";
			return "na etapa " + $scope.steps[$scope.currentForm].name;
		};

		$scope.isPastStep = function(step) {
			if($scope.currentStep == step) return true;

			for(var i in $scope.steps) {
				if($scope.steps[i].id == step) return true;
				if($scope.steps[i].id == $scope.currentStep) return false;
			}
		};

		$scope.getCaseTimelineClass = function(step) {
			if($scope.currentStep == step) return 'btn-info';

			for(var i in $scope.steps) {
				if($scope.steps[i].id == step) return 'btn-success';
				if($scope.steps[i].id == $scope.currentStep) return 'btn-default';
			}
		};

		init();

	});

})();