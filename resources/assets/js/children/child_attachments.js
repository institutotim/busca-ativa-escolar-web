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
				Modals.show(Modals.Prompt('Qual a descrição do anexo que será enviado?', '', false))
					.then(function(description) {
						return Modals.show(Modals.FileUploader(
							'Anexar arquivo',
							'Selecione um arquivo para anexar ao perfil da criança',
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