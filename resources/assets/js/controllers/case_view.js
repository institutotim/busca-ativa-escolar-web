(function() {

	angular.module('BuscaAtivaEscolar').controller('CaseViewCtrl', function ($scope, $rootScope, Modals, MockData, Identity) {

		$rootScope.section = 'cases';

		$scope.identity = Identity;
		$scope.reasons = MockData.alertReasons;

		$scope.isPanelOpen = {};
		$scope.currentStep = null;
		$scope.currentForm = null;
		$scope.message = "";
		$scope.messages = [];

		$scope.steps = {
			'pesquisa': {id: 'pesquisa', name: 'Pesquisa', opens: ['info', 'location'], next: 'parecer'},
			'parecer': {id: 'parecer', name: 'Parecer', opens: ['parecer'], next: 'consolidacao'},
			'consolidacao': {id: 'consolidacao', name: 'Consolidação', next: 'reinsercao'},
			'reinsercao': {id: 'reinsercao', name: 'Reinserção', next: '1obs'},
			'1obs': {id: '1obs', name: '1a observação', next: '2obs'},
			'2obs': {id: '2obs', name: '2a observação', next: '3obs'},
			'3obs': {id: '3obs', name: '3a observação', next: '4obs'},
			'4obs': {id: '4obs', name: '4a observação'}
		};

		function init() {
			$scope.setCaseStep('pesquisa');
			$scope.openForm('pesquisa');
		}

		$scope.hasNextStep = function() {
			if(!$scope.steps[$scope.currentStep]) return false;
			return !!$scope.steps[$scope.currentStep].next;
		};

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

		$scope.sendToApp = function() {
			Modals.show(Modals.Alert(
				'Ficha enviada para seu dispositivo!',
				'Ela estará disponível na área de Notificações do aplicativo Busca Ativa Escolar'
			));
		};

		$scope.saveAndProceed = function() {
			if(!$scope.hasNextStep()) return;

			Modals.show(Modals.Confirm('Tem certeza que deseja prosseguir de etapa?', 'Ao progredir de etapa, a etapa anterior será marcada como concluída.')).then(function () {
				var next = $scope.steps[$scope.currentStep].next;

				$scope.setCaseStep(next);
				$scope.openForm(next);
			})

		};

		$scope.openForm = function(form) {

			if(form != 'consolidada' && !$scope.isPastStep(form)) {
				Modals.show(Modals.Alert('Etapa ainda não liberada!', 'Você deve completar a etapa anterior para que a ficha da nova etapa seja liberada.'));
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