<?php
    require_once "../../private/Api/Common/Utilities.php";

    $sessionKey = GetSessionKey();
    if ($sessionKey == null) {
        echo "Session Key Not Set";
    } else {
        echo "Session Key: ".$sessionKey;
    }
?>
<html>
    <head>
        <title>The Makeup App</title>
    </head>
    <body>
    <a href="/signup">Sign Up</a> | <a href="/login">Login</a> | <a href="/logout">Logout</a>
    </body>
</html>