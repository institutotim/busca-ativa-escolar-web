(function() {

	var app = angular.module('BuscaAtivaEscolar');

	app.service('Language', function Language($q, $http, API) {

		var database = {};

		function setup() {
			console.log("[core.language] Setting up language service...");
			loadFromAPI();
		}

		function loadFromAPI() {
			console.log("[core.language] Loading language file...");
			$http.get(API.getURI('language.json')).then(onDataLoaded);
		}

		function onDataLoaded(res) {
			if(!res.data || !res.data.database) {
				console.error("[core.language] Failed to load language file: ", res);
				return;
			}

			database = res.data.database;

			console.log("[core.language] Language file loaded! " + database.length + " strings available", database);
		}

		function translate(word, key) {
			var stringID = key + "." + word;
			return string(stringID);
		}

		function string(stringID) {
			if(!database) return "DB_EMPTY:" + stringID;
			if(!database[stringID]) return "STR_MISSING:" + stringID;

			return database[stringID];
		}

		return {
			setup: setup,
			translate: translate,
			string: string
		};

	});

	app.run(function (Language) {
		Language.setup();
	});

	app.filter('lang', function LanguageTranslateFilter(Language) {
		var $fn = function(word, key) {
			return Language.translate(word, key);
		};

		$fn.$stateful = true; // TODO: optimize so this is not needed

		return $fn;
	});

	app.filter('string', function LanguageStringFilter(Language) {
		var $fn =  function(stringID) {
			return Language.string(stringID);
		};

		$fn.$stateful = true; // TODO: optimize so this is not needed

		return $fn;
	});

})();