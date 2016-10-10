(function() {

	angular.module('BuscaAtivaEscolar').service('Identity', function () {

		var mockUsers = {
			'agente_comunitario': {name: 'Mary Smith', type: 'Agente Comunitário', can: ['dashboard']},
			'tecnico_verificador': {name: 'Paul Atree', type: 'Técnico Verificador', can: ['preferences', 'dashboard','cases']},
			'supervisor_institucional': {name: 'John Doe', type: 'Supervisor Institucional', can: ['preferences', 'dashboard','cases','reports', 'users']},
			'coordenador_operacional': {name: 'Aryel Tupinambá', type: 'Coordenador Operacional', can: ['preferences', 'dashboard','cases','reports','users', 'users.edit', 'users.create', 'settings']},
			'gestor_politico': {name: 'João das Neves', type: 'Gestor Político', can: ['preferences', 'dashboard','reports','users']},
			'gestor_nacional': {name: 'Jane Doe', type: 'Gestor Nacional', can: ['preferences', 'dashboard','reports','cities', 'users.filter_by_city']},
			'super_administrador': {name: 'Morgan Freeman', type: 'Super Administrador', can: ['preferences', 'dashboard','reports','cities','cities.edit','users','users.edit', 'users.create', 'settings', 'users.filter_by_city']}
		};

		var currentType = 'coordenador_operacional';
		var currentUser = mockUsers[currentType];

		function getCurrentUser() {
			return currentUser;
		}

		function can(operation) {
			if(!currentUser) return false;
			return getCurrentUser().can.indexOf(operation) !== -1;
		}

		function getType() {
			return currentType;
		}

		function setUserType(type) {
			currentType = type;
			currentUser = mockUsers[type];
		}

		return {
			getCurrentUser: getCurrentUser,
			getType: getType,
			can: can,
			setUserType: setUserType
		}

	});

})();