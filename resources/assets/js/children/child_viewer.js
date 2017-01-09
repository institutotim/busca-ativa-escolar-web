(function() {

	angular.module('BuscaAtivaEscolar')
		.controller('ChildViewCtrl', ChildViewCtrl)
		.controller('ChildCasesCtrl', ChildCasesCtrl)
		.controller('ChildCaseStepCtrl', ChildCaseStepCtrl)
		.config(function ($stateProvider) {
			$stateProvider
				.state('child_viewer', {
					url: '/children/view/{child_id}',
					templateUrl: '/views/children/view/main.html',
					controller: 'ChildViewCtrl'
				})
				.state('child_viewer.consolidated', {
					url: '/consolidated',
					templateUrl: '/views/children/view/consolidated.html'
				})
				.state('child_viewer.cases', {
					url: '/children/{child_id}',
					templateUrl: '/views/children/view/steps.html',
					controller: 'ChildCasesCtrl'
				})
				.state('child_viewer.cases.view_step', {
					url: '/{step_type}/{step_id}',
					templateUrl: '/views/children/view/case_info.html',
					controller: 'ChildCaseStepCtrl'
				})
				.state('child_viewer.activity_log', {
					url: '/activity_log',
					templateUrl: '/views/children/view/activity_log.html'
				})
				.state('child_viewer.comments', {
					url: '/comments',
					templateUrl: '/views/children/view/comments.html'
				})
				.state('child_viewer.attachments', {
					url: '/attachments',
					templateUrl: '/views/children/view/attachments.html'
				})
				.state('child_viewer.assigned_users', {
					url: '/assigned_users',
					templateUrl: '/views/children/view/assigned_users.html'
				})
		});

	function ChildViewCtrl($scope, $state, $stateParams, Children, Decorators) {
		if($state.current.name === "child_viewer") $state.go('.consolidated');

		$scope.Decorators = Decorators;
		$scope.Children = Children;

		$scope.child_id = $stateParams.child_id;
		$scope.child = Children.find({id: $scope.child_id});

		console.log("[core] @ChildViewCtrl", $scope.child);

		// TODO: get consolidated info from endpoint

	}

	function ChildCasesCtrl($scope, $state, $stateParams, Children, CaseSteps, Decorators) {

		$scope.Decorators = Decorators;
		$scope.Children = Children;
		$scope.CaseSteps = CaseSteps;

		$scope.child_id = $scope.$parent.child_id;
		$scope.child = $scope.$parent.child;

		$scope.openedCase = null;

		$scope.child.$promise.then(function (child) {
			$scope.openedCase = child.cases.find(function(item) {
				if($stateParams.case_id) return item.id === $stateParams.case_id;
				return item.case_status == 'in_progress';
			});
		});

		console.log("[core] @ChildCasesCtrl", $scope.child, $scope.openedCase);

		$scope.collapseCase = function (childCase) {
			$scope.openedCase = childCase;
		};

		$scope.isCaseCollapsed = function(childCase) {
			if(!$scope.openedCase) return true;
			return $scope.openedCase.id !== childCase.id;
		};

		$scope.renderStepStatusClass = function(childCase, step) {
			if(childCase.current_step_id === step.id) return 'step-current';
			if(step.is_completed) return 'step-completed';
			return 'step-pending';
		};

		$scope.canOpenStep = function(step) {
			if(step.is_completed) return true;
			if(step.id === $scope.openedCase.current_step_id) return true;
			return false;
		};

		$scope.openStep = function(selectedStep) {
			if(!$scope.canOpenStep(selectedStep)) return false;

			$state.go('child_viewer.cases.view_step', {step_type: selectedStep.step_type, step_id: selectedStep.id});
		};

		$scope.canCompleteStep = function(childCase, step) {
			return (step.id === childCase.current_step_id && step.report_index !== 4);
		};

		$scope.hasNextStep = function(step) {
			if(!step) return false;
			if(step.step_type === 'BuscaAtivaEscolar\\CaseSteps\\Observacao' && step.report_index === 4) return false;
			return true;
		};

		// TODO: handle case cancelling
		// TODO: handle case completing
	}

	function ChildCaseStepCtrl($scope, $state, $stateParams, Children, Decorators, CaseSteps) {
		// TODO: get actual step data from endpoint
		// TODO: handle step data saving
		// TODO: handle requests to save-and-proceed

		$scope.Decorators = Decorators;
		$scope.Children = Children;
		$scope.CaseSteps = CaseSteps;

		$scope.editable = true;
		$scope.showAll = false;
		$scope.showTitle = true;

		$scope.child_id = $scope.$parent.child_id;
		$scope.child = $scope.$parent.child;
		$scope.case = $scope.$parent.openedCase;

		$scope.step = CaseSteps.find({type: $stateParams.step_type, id: $stateParams.step_id, with: 'fields'});

		console.log("[core] @ChildCaseStepCtrl", $scope.step);

		$scope.isStepOpen = function (stepClassName) {
			if(!$scope.step) return false;
			return $scope.step.step_type === "BuscaAtivaEscolar\\CaseSteps\\" + stepClassName;
		};

		$scope.hasNextStep = function() {
			if(!$scope.step) return false;
			if($scope.step.step_type === 'BuscaAtivaEscolar\\CaseSteps\\Observacao' && $scope.step.report_index === 4) return false;
			return true;
		};
	}

	function ChildCommentsCtrl() {
		// TODO: handle comments
	}

	function ChildAttachmentsCtrl() {
		// TODO: handle attachments
	}

	function ChildActivityLogCtrl() {
		// TODO: handle activity log
	}

	function ChildAssignedUsersCtrl() {
		// TODO: handle assigned users
	}

	function LegacyCaseViewCtrl($scope, $rootScope, $state, $location, ngToast, Modals, MockData, Identity) {

		if($state.current.name === "case_viewer") $state.go('.consolidated');

		$scope.identity = Identity;
		$scope.reasons = MockData.alertReasons;

		$scope.input = {
			hasBeenAtSchool: 1,
			doesWork: 1,
			reasons: {3: 1},
			obsStillAtSchool: 1,
		};

		$scope.isCaseClosed = false;
		$scope.isPanelOpen = {};
		$scope.currentStep = null;
		$scope.currentForm = null;
		$scope.message = "";
		$scope.messages = [];

		$scope.steps = {
			'alerta': {id: 'alerta', name: 'Alerta', opens: [], next: 'pesquisa'},
			'pesquisa': {id: 'pesquisa', name: 'Pesquisa', opens: ['info', 'parents', 'location', 'education', 'work', 'causes'], next: 'analise_tecnica'},
			'analise_tecnica': {id: 'analise_tecnica', name: 'Análise Técnica', opens: ['analise_tecnica'], next: 'gestao_do_caso'},
			'gestao_do_caso': {id: 'gestao_do_caso', name: 'Gestão do Caso', next: 'rematricula'},
			'rematricula': {id: 'rematricula', name: '(Re)matrícula', next: '1obs'},
			'1obs': {id: '1obs', name: '1a observação', next: '2obs'},
			'2obs': {id: '2obs', name: '2a observação', next: '3obs'},
			'3obs': {id: '3obs', name: '3a observação', next: '4obs'},
			'4obs': {id: '4obs', name: '4a observação'}
		};

		$scope.lastStep2014 = '1obs';
		$scope.steps2014Collapsed = true;
		$scope.steps2016Collapsed = false;

		$scope.steps2014 = {
			'alerta': {id: 'alerta', name: 'Alerta', opens: ['info', 'parents'], next: 'pesquisa'},
			'pesquisa': {
				id: 'pesquisa',
				name: 'Pesquisa',
				opens: ['info', 'parents', 'location'],
				next: 'analise_tecnica'
			},
			'analise_tecnica': {
				id: 'analise_tecnica',
				name: 'Análise Técnica',
				opens: ['analise_tecnica'],
				next: 'gestao_do_caso'
			},
			'gestao_do_caso': {id: 'gestao_do_caso', name: 'Consolidação', next: 'rematricula'},
			'rematricula': {id: 'rematricula', name: 'Reinserção', next: '1obs'},
			'1obs': {id: '1obs', name: '1a observação', next: '2obs'},
		};

		function init() {
			$scope.setCaseStep('pesquisa', true);
			$scope.openForm('pesquisa');
		}

		$scope.closeCase = function() {
			Modals.show(Modals.CaseRestart()).then(function() {
				$scope.steps2016Collapsed = true;
				$scope.isCaseClosed = true;

				ngToast.create({
					className: 'success',
					content: 'Caso encerrado!'
				});

				$location.path('/cases');
			});
		};

		$scope.resolveCase = function() {
			Modals.show(Modals.Confirm(
				'Tem certeza que deseja finalizar esse caso?',
				'Ao finalizar o caso, essa criança será registrada como "Dentro da Escola", e deixará de aparecer nas listas de pendências. Essa operação não pode ser desfeita.'))
				.then(function() {
					ngToast.create({
						className: 'success',
						content: 'Caso finalizado!'
					});

					$location.path('/cases');
				});
		};

		$scope.assignUserToStep = function(stepName, canDismiss) {
			stepName = stepName || $scope.currentStep;
			canDismiss = !!canDismiss;

			var userType = (stepName == 'pesquisa' || stepName == 'analise_tecnica') ? 'Técnico Verificador' : 'usuário';

			Modals.show(Modals.UserPicker('Selecione o ' + userType + ' responsável:', 'O ' + userType + ' selecionado ficará responsável pela execução da etapa ' + $scope.steps[stepName].name + '.', canDismiss)).then(function() {
				ngToast.create({
					className: 'success',
					content: 'Responsável atribuído!'
				});
			});
		};

		$scope.openActivityLogEntry = function() {
			Modals.show(Modals.CaseActivityLogEntry());
		};

		$scope.hasNextStep = function() {
			if(!$scope.steps[$scope.currentStep]) return false;
			return !!$scope.steps[$scope.currentStep].next;
		};

		$scope.getNextStepName = function() {
			if(!$scope.steps[$scope.currentStep]) return '';
			return $scope.steps[$scope.steps[$scope.currentStep].next].name || '';
		};

		$scope.getCurrentStepName = function() {
			if(!$scope.steps[$scope.currentStep]) return '';
			return $scope.steps[$scope.currentStep].name || '';
		};

		$scope.setCaseStep = function(step, skipNotification) {
			$scope.currentStep = step;
			$scope.isPanelOpen = {};

			for(var i in $scope.steps[step].opens) {
				$scope.isPanelOpen[$scope.steps[step].opens[i]] = true;
			}

			if(skipNotification) return;

			ngToast.create({
				className: 'success',
				content: 'Caso progredido para a etapa ' + $scope.steps[step].name
			});
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

		$scope.save = function() {
			ngToast.create({
				className: 'success',
				content: 'Dados salvos na ficha de ' + $scope.steps[$scope.currentStep].name
			});
		};

		$scope.saveAndProceed = function() {
			if(!$scope.hasNextStep()) return;

			var question = 'Tem certeza que deseja prosseguir para a etapa ' + $scope.getNextStepName() + '?';
			var explanation = 'Ao progredir de etapa, a etapa ' + $scope.getCurrentStepName() + ' será marcada como concluída.';

			if($scope.currentStep == "analise_tecnica") {
				question = 'Tem certeza que deseja concluir a Análise Técnica?';
				explanation = 'Ao dizer SIM, a Análise Técnica será marcada como concluída e nenhuma informação poderá ser editada.';
			}

			Modals.show(Modals.Confirm(question, explanation)).then(function () {
				var next = $scope.steps[$scope.currentStep].next;

				ngToast.create({
					className: 'success',
					content: 'Dados salvos na ficha de ' + $scope.steps[$scope.currentStep].name
				});

				$scope.setCaseStep(next);
				$scope.openForm(next);

				// previous step was pesquisa; this step assigned user defaults to the previous one
				if($scope.currentStep == "analise_tecnica" || !Identity.can('case.assign')) return;

				$scope.assignUserToStep($scope.currentStep, false);
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
			if($scope.currentForm == "consolidada") return "Dados consolidados";
			return $scope.steps[$scope.currentForm].name;
		};

		$scope.isPastStep = function(step, skipCurrentStep) {
			if($scope.currentStep == step) return !skipCurrentStep;

			for(var i in $scope.steps) {
				if($scope.steps[i].id == step) return true;
				if($scope.steps[i].id == $scope.currentStep) return false;
			}
		};

		$scope.getCaseTimelineClass = function(step, current) {
			if(!current) current = $scope.currentStep;
			if(current == step) return 'step-current';

			for(var i in $scope.steps) {
				if($scope.steps[i].id == step) return 'step-completed';
				if($scope.steps[i].id == current) return 'step-pending';
			}
		};

		init();

	}
})();