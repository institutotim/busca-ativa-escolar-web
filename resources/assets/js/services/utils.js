(function() {

	angular.module('BuscaAtivaEscolar')
		.run(function() {
			Array.prototype.shuffle = function() {
				var i = this.length, j, temp;
				if ( i == 0 ) return this;
				while ( --i ) {
					j = Math.floor( Math.random() * ( i + 1 ) );
					temp = this[i];
					this[i] = this[j];
					this[j] = temp;
				}
				return this;
			}

			Array.prototype.clone = function() {
				return this.slice(0);
			};

		})
		.factory('Utils', function() {
			return {
				stripTimeFromTimestamp: function (timestamp) {
					if(timestamp instanceof Date) timestamp = timestamp.toISOString();
					return ("" + timestamp).substring(0, 10);
				}
			};
		})
		.directive('stringToNumber', function() {
			return {
				require: 'ngModel',
				link: function(scope, element, attrs, ngModel) {
					ngModel.$parsers.push(function(value) {
						return '' + value;
					});
					ngModel.$formatters.push(function(value) {
						return parseFloat(value);
					});
				}
			};
		});

})();

function identify(namespace, file) {
	console.log("[core.load] ", namespace, file);
}