(function() {

	angular.module('BuscaAtivaEscolar')
		.controller('ChildViewCtrl', ChildViewCtrl)

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

})();