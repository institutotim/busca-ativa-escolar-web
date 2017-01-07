(function() {
	identify('config', 'toasts.js');

	angular.module('BuscaAtivaEscolar').config(function(ngToastProvider) {
		ngToastProvider.configure({
			verticalPosition: 'top',
			horizontalPosition: 'right',
			maxNumber: 3,
			animation: 'slide',
			dismissButton: true,
			timeout: 3000
		});
	});

})();