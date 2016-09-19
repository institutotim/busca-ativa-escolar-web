(function() {

	angular.module('BuscaAtivaEscolar').service('Identity', function () {

		var mockUsers = {
			'agente_comunitario': {name: 'Mary Smith', type: 'Agente Comunitário', can: ['dashboard']},
			'tecnico_verificador': {name: 'Paul Atree', type: 'Técnico Verificador', can: ['dashboard','cases']},
			'supervisor_institucional': {name: 'John Doe', type: 'Supervisor Institucional', can: ['dashboard','cases','reports']},
			'coordenador_operacional': {name: 'Aryel Tupinambá', type: 'Coordenador Operacional', can: ['dashboard','cases','reports','users', 'users.edit', 'users.create', 'settings']},
			'gestor_politico': {name: 'João das Neves', type: 'Gestor Político', can: ['dashboard','reports','users']},
			'unicef': {name: 'Jane Doe', type: 'Gestor UNICEF', can: ['dashboard','reports','cities']},
			'super_administrador': {name: 'Morgan Freeman', type: 'Super Administrador', can: ['dashboard','reports','cities','cities.edit','users','users.edit', 'users.create', 'settings']}
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