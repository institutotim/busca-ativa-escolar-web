(function() {

	angular
		.module('BuscaAtivaEscolar')
		.factory('AppDependencies', function() {
			return [
				["Back-end", "Laravel Framework",           "5.3",      "http://laravel.com", "MIT"],
				["Back-end", "PHP",                         "7.1",      "http://php.net", "PHP License 3.01"],
				["Back-end", "MariaDB",                     "10.0.20",  "http://mariadb.org", "GPLv2"],
				["Back-end", "memcached",                   "1.4.31",   "http://memcached.org", "BSD"],
				["Front-end", "AngularJS",                   "1.5.5",    "http://angularjs.org", "MIT"],
				["Front-end", "jQuery",                      "3.1.0",    "http://jquery.org", "MIT"],
				["Front-end", "Twitter Bootstrap",           "3.0.0",    "http://getbootstra.com", "MIT"],
				["Front-end", "Bootstrap Material Design",   "",         "http://fezvrasta.github.io/bootstrap-material-design/", "MIT"],
				["Front-end", "TinyMCE",                     "4.4.3",    "http://www.tinymce.com", "LGPL"],
				["Front-end", "Highcharts",                  "",         "http://highcharts.com", "Creative Commons BY-NC 3.0"],
				["Front-end", "ngFileUpload",                "",         "https://github.com/danialfarid/ng-file-upload", "MIT"],
				["Front-end", "ngToast",                     "",         "https://github.com/tameraydin/ngToast", "MIT"],
				["Front-end", "ArriveJS",                    "",         "https://github.com/uzairfarooq/arrive", "MIT"],
				["Front-end", "AngularUI",                   "",         "https://angular-ui.github.io/", "MIT"],
				["Front-end", "Angular Bootstrap Lightbox",  "",         "https://github.com/compact/angular-bootstrap-lightbox", "MIT"],
				["Aplicativo", "Apache Cordova",             "6.x",         "https://cordova.apache.org/", "Apache"],
				["Aplicativo", "ngCordova",                  "",         "http://ngcordova.com/", "MIT"],
			];
		});

})();