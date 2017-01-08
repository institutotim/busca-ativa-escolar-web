(function() {
	angular.module('BuscaAtivaEscolar').service('Decorators', function () {
		var Child = {
			parents: function(child) {
				return (child.mother_name || '')
					+ ((child.mother_name && child.father_name) ? ' / ' : '')
					+ (child.father_name || '');
			}
		};

		var Step = {
			name: function(step) {
				// TODO: handle Observacao "report_index"
				var name = step.step_type.split("\\").pop();
				if(name !== 'Observacao') return name;
				return step.report_index + 'a' + name;
			}
		};

		return {
			Child: Child,
			Step: Step
		};
	})
})();