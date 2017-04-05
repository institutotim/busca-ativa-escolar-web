(function() {

	angular.module('BuscaAtivaEscolar')
		.config(function ($stateProvider) {
			$stateProvider.state('child_viewer.attachments', {
				url: '/attachments',
				templateUrl: '/views/children/view/attachments.html',
				controller: 'ChildAttachmentsCtrl',
			})
		})
		.controller('ChildAttachmentsCtrl', function ($scope, $state, $stateParams, ngToast, Auth, API, Modals, Children) {

			$scope.Children = Children;

			$scope.attachments = {};
			$scope.uploadToken = "";

			$scope.refresh = function() {
				$scope.attachments = Children.getAttachments({id: $stateParams.child_id});
			};

			$scope.uploadAttachment = function() {
				Modals.show(Modals.Prompt('Anexando um arquivo ao caso', '', false, 'Qual a descrição do anexo que será enviado?'))
					.then(function(description) {
						return Modals.show(Modals.FileUploader(
							'Anexando um arquivo ao caso',
							'Selecione abaixo o arquivo que deseja anexar ao caso.',
							API.getURI('children/' + $stateParams.child_id + '/attachments'),
							{description: description}
						))
					})
					.then(function (file) {
						ngToast.success('Arquivo anexado!');
						$scope.refresh();
					})
			};

			console.log("[core] @ChildAttachmentsCtrl", $stateParams);

			$scope.refresh();

		});

})();