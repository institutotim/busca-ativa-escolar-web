(function() {

	angular
		.module('BuscaAtivaEscolar')
		.config(function ($stateProvider) {
			$stateProvider
				.state('sms_conversations', {
					url: '/maintenance/sms_conversations',
					templateUrl: '/views/maintenance/sms_conversations.html',
					controller: 'SmsConversationsCtrl'
				})
		})
		.controller('SmsConversationsCtrl',
			function ($scope, $rootScope, $localStorage, $http, $timeout, $interval, StaticData, SmsConversations, Modals, ngToast, API) {

				$scope.static = StaticData;

				$scope.refresh = function() {
					SmsConversations.all({}, function (conversations) {
						$scope.conversations = conversations;
					});
				};

				$scope.conversations = {};
				$scope.refresh();
			}
		);
})();