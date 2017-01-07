(function() {

	angular.module('BuscaAtivaEscolar').run(function() {
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
	});

})();

function identify(namespace, file) {
	console.log("[core.load] ", namespace, file);
}