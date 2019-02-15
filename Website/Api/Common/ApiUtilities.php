<?php

function BadRequest($httpStatus) {
    http_response_code($httpStatus);
    die();
}

// Source: https://stackoverflow.com/a/40582472/8070411
function GetAuthorizationHeader(){
    $headers = null;
    if (isset($_SERVER['Authorization'])) {
        $headers = trim($_SERVER["Authorization"]);
    }
    else if (isset($_SERVER['HTTP_AUTHORIZATION'])) { //Nginx or fast CGI
        $headers = trim($_SERVER["HTTP_AUTHORIZATION"]);
    } elseif (function_exists('apache_request_headers')) {
        $requestHeaders = apache_request_headers();
        // Server-side fix for bug in old Android versions (a nice side-effect of this fix means we don't care about capitalization for Authorization)
        $requestHeaders = array_combine(array_map('ucwords', array_keys($requestHeaders)), array_values($requestHeaders));
        //print_r($requestHeaders);
        if (isset($requestHeaders['Authorization'])) {
            $headers = trim($requestHeaders['Authorization']);
        }
    }
    return $headers;
}

// Source: https://stackoverflow.com/a/40582472/8070411
function GetBearerToken() {
    $headers = getAuthorizationHeader();
    // HEADER: Get the access token from the header
    if (!empty($headers)) {
        if (preg_match('/Bearer\s(\S+)/', $headers, $matches)) {
            return $matches[1];
        }
    }
    return null;
}

function GetRequestIsEmpty() {
    return count($_GET) == 0;
}

function GetRequestIsForUniqueId() {
    return count($_GET) == 2 && isset($_GET['uid']) && isset($_GET['endpoint']);
}

function GetUniqueId() {
    if (isset($_GET['uid'])) {
        return $_GET['uid'];
    }
    return null;
}

?>