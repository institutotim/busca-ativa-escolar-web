<?php
// Necessary so default Homestead config will forward HTML5-based routes all here
// (it's configured to render $uri, $uri/ and then /index.php?$query_string)

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

if(substr($uri, 0, 7) === "/views/") {
	http_response_code(404);
	die("FILE_NOT_FOUND:{$uri}");
}

include("index.html");