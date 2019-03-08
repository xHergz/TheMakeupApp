<?php
    define("SessionCookie", "tma_session_key");

    function IsWindows() {
        if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
            return true;
        }
        return false;
    }

    function GetClientIp() {
        $ipaddress = '';
        if ($_SERVER['HTTP_CLIENT_IP'])
            $ipaddress = $_SERVER['HTTP_CLIENT_IP'];
        else if($_SERVER['HTTP_X_FORWARDED_FOR'])
            $ipaddress = $_SERVER['HTTP_X_FORWARDED_FOR'];
        else if($_SERVER['HTTP_X_FORWARDED'])
            $ipaddress = $_SERVER['HTTP_X_FORWARDED'];
        else if($_SERVER['HTTP_FORWARDED_FOR'])
            $ipaddress = $_SERVER['HTTP_FORWARDED_FOR'];
        else if($_SERVER['HTTP_FORWARDED'])
            $ipaddress = $_SERVER['HTTP_FORWARDED'];
        else if($_SERVER['REMOTE_ADDR'])
            $ipaddress = $_SERVER['REMOTE_ADDR'];
        else
            $ipaddress = 'UNKNOWN';
     
        return $ipaddress;
    }

    function GetSessionKey() {
        if (!isset($_COOKIE[SessionCookie])) {
            return null;
        }
        return $_COOKIE[SessionCookie];
    }

    function SetSessionKey($sessionKey) {
        setcookie(SessionCookie, $sessionKey, time()+86400, "/");
    }

    function EndSession() {
        setcookie(SessionCookie, "", time()-86400);
    }

    function Redirect($url) {
        header('Location: ' . $url, true);
    }

    function str_replace_first($find, $replace, $string) {
        $pos = strpos($string, $find);
        if ($pos !== false) {
            return substr_replace($string, $replace, $pos, strlen($find));
        }
        return $string;
    }

    // Source: https://stackoverflow.com/a/9826656
    function get_string_between($string, $start, $end){
        $string = ' ' . $string;
        $ini = strpos($string, $start);
        if ($ini == 0) return '';
        $ini += strlen($start);
        $len = strpos($string, $end, $ini) - $ini;
        return substr($string, $ini, $len);
    }
?>
