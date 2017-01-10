(function() {
	angular
		.module('BuscaAtivaEscolar')
		.factory('StaticData', function StaticData(API, Identity, $rootScope, $http) {

			var data = {};
			var self = this;

			// TODO: cache this?

			function fetchLatestVersion() {
				console.log("[static_data] Downloading latest static data definitions...");
				$http.get(API.getURI('static/static_data?version=latest')).then(onFetch);
			}

			function refresh() {
				// TODO: validate timestamp?
				fetchLatestVersion();
			}

			function onFetch(res) {
				console.log("[static_data] Downloaded! Version=", res.data.version, "Timestamp=", res.data.timestamp, "Data=", res.data.data);
				data = res.data.data;
			}

			function getAlertCauses() { return (data.AlertCause) ? data.AlertCause : {}; }
			function getCaseCauses() { return (data.CaseCause) ? data.CaseCause : {}; }
			function getGenders() { return (data.Gender) ? data.Gender : {}; }
			function getHandicappedRejectReasons() { return (data.HandicappedRejectReason) ? data.HandicappedRejectReason : {}; }
			function getIncomeRanges() { return (data.IncomeRange) ? data.IncomeRange : {}; }
			function getRaces() { return (data.Race) ? data.Race : {}; }
			function getSchoolGrades() { return (data.SchoolGrade) ? data.SchoolGrade : {}; }
			function getSchoolingLevels() { return (data.SchoolingLevel) ? data.SchoolingLevel : {}; }
			function getWorkActivities() { return (data.WorkActivity) ? data.WorkActivity : {}; }

			return {
				fetchLatestVersion: fetchLatestVersion,
				refresh: refresh,
				getAlertCauses: getAlertCauses,
				getCaseCauses: getCaseCauses,
				getGenders: getGenders,
				getHandicappedRejectReasons: getHandicappedRejectReasons,
				getIncomeRanges: getIncomeRanges,
				getRaces: getRaces,
				getSchoolGrades: getSchoolGrades,
				getSchoolingLevels: getSchoolingLevels,
				getWorkActivities: getWorkActivities,
			};

		});
})();