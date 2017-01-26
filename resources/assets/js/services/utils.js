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

			function stripTimeFromTimestamp(timestamp) {
				if(timestamp instanceof Date) timestamp = timestamp.toISOString();
				return ("" + timestamp).substring(0, 10);
			}

			function filter(obj, predicate) {
				if(obj.constructor === Array) return obj.filter(predicate);

				var result = {}, key;

				for (key in obj) {
					if (obj.hasOwnProperty(key) && !!predicate(obj[key])) {
						result[key] = obj[key];
					}
				}

				return result;
			}

			function extract(field, obj, predicate) {
				var filtered = filter(obj, predicate);
				var result = [];

				for(var i in filtered) {
					if(!filtered.hasOwnProperty(i)) continue;
					result.push(filtered[i][field]);
				}

				return result;
			}

			return {
				stripTimeFromTimestamp: stripTimeFromTimestamp,
				filter: filter,
				extract: extract,
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