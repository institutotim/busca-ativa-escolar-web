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

			function prepareDateFields(data, dateOnlyFields) {
				for(var i in data) {
					if(!data.hasOwnProperty(i)) continue;
					if(dateOnlyFields.indexOf(i) === -1) continue;

					data[i] = stripTimeFromTimestamp(data[i]);
				}

				return data;
			}

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

			function pluck(collection, value_column, key_column) {
				var hasKeyColumn = !!key_column;
				var plucked = (hasKeyColumn) ? {} : [];

				for(var i in collection) {
					if(!collection.hasOwnProperty(i)) continue;

					var value = collection[i][value_column] ? collection[i][value_column] : null;

					if(!hasKeyColumn) {
						plucked.push(value);
						continue;
					}

					var key = collection[i][key_column] ? collection[i][key_column] : i;
					plucked[key] = value;

				}

				return plucked;
			}

			return {
				stripTimeFromTimestamp: stripTimeFromTimestamp,
				prepareDateFields: prepareDateFields,
				filter: filter,
				extract: extract,
				pluck: pluck,
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
		})
		.filter('parseDate', function() {
			return function(input) {
				return new Date(input);
			};
		});

})();

function identify(namespace, file) {
	console.log("[core.load] ", namespace, file);
}