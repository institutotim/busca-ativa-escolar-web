(function() {

	angular.module('BuscaAtivaEscolar')
		.service('Notifications', function ($interval, $location, ngToast, Config, Platform, UserNotifications) {

			var notifications = [];
			var seenNotifications = [];
			var isBusy = false;

			function refresh(isFirstRefresh) {
				isBusy = true;

				console.log("[notifications] Checking for unread notifications...");

				UserNotifications.getUnread({$hide_loading_feedback: true}, function (res) {
					notifications = res.data;
					console.log("[notifications] Unread notifications: ", notifications);
					isBusy = false;
					emitToastsOnNewNotifications(isFirstRefresh);
				});
			}

			function setup() {
				refresh(true);
				$interval(refresh, Config.NOTIFICATIONS_REFRESH_INTERVAL);
			}

			function emitToastsOnNewNotifications(isFirstRefresh) {
				for(var i in notifications) {
					if(!notifications.hasOwnProperty(i)) continue;
					if(seenNotifications.indexOf(notifications[i].id) !== -1) continue;

					seenNotifications.push(notifications[i].id);

					if(isFirstRefresh) return;

					console.info("[notifications.new] ", notifications[i]);

					ngToast.create({
						className: notifications[i].data.type || 'info',
						content: notifications[i].data.title
					})
				}
			}

			function isLoading() {
				return isBusy;
			}

			function hasUnread() {
				return (notifications && notifications.length > 0);
			}

			function markAsRead(notification) {
				if(!notification) return false;
				UserNotifications.markAsRead({id: notification.id}, function() {
					refresh();
				});
			}

			function open(notification) {
				if(!notification) return false;
				if(!notification.open_url) return false;

				$location.url(notification.open_url);

				return false;
			}

			function getNotifications() {
				return notifications;
			}

			return {
				getUnread: getNotifications,
				markAsRead: markAsRead,
				open: open,
				refresh: refresh,
				isBusy: isLoading,
				hasUnread: hasUnread,
				setup: setup,
			}

		})
		.run(function (Notifications) {
			Notifications.setup();
		})

})();