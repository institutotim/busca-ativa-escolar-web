(function() {

	angular.module('BuscaAtivaEscolar').service('Identity', function ($cookies) {

		var mockUsers = {
			'agente_comunitario': {
				name: 'Mary Smith',
				email: 'mary.smith@saopaulo.sp.gov.br',
				type: 'Agente Comunitário',
				can: ['dashboard']
			},
			'tecnico_verificador': {
				name: 'Paul Atree',
				email: 'paul.atree@saopaulo.sp.gov.br',
				type: 'Técnico Verificador',
				can: ['preferences', 'dashboard','cases']
			},
			'supervisor_institucional': {
				name: 'John Doe',
				email: 'john.doe@saopaulo.sp.gov.br',
				type: 'Supervisor Institucional',
				can: ['preferences', 'dashboard','cases','reports', 'users']
			},
			'coordenador_operacional': {
				name: 'Aryel Tupinambá',
				email: 'atupinamba@saopaulo.sp.gov.br',
				type: 'Coordenador Operacional',
				can: ['preferences', 'dashboard','cases','reports','users', 'users.edit', 'users.create', 'settings']
			},
			'gestor_politico': {
				name: 'João das Neves',
				email: 'jneves@saopaulo.sp.gov.br',
				type: 'Gestor Político',
				can: ['preferences', 'dashboard','reports','users']
			},
			'gestor_nacional': {
				name: 'Jane Doe',
				email: 'fdenp@unicef.org.br',
				type: 'Gestor Nacional',
				can: ['preferences', 'dashboard','reports','cities', 'users.filter_by_city']
			},
			'super_administrador': {
				name: 'Morgan Freeman',
				email: 'dev@lqdi.net',
				type: 'Super Administrador',
				can: ['preferences', 'dashboard','reports','cities','cities.edit','users','users.edit', 'users.create', 'settings', 'users.filter_by_city']
			}
		};

		var currentType = $cookies.get('FDENP_Dev_UserType') || 'coordenador_operacional';
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

			$cookies.put('FDENP_Dev_UserType', type);

			if(window.zE) {
				zE.identify({
					name: currentUser.name,
					email: currentUser.email
				});
			}
		}

		return {
			getCurrentUser: getCurrentUser,
			getType: getType,
			can: can,
			setUserType: setUserType
		}

	});

})();