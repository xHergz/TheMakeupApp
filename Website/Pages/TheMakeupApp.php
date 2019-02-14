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
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>The Makeup App</title>
    </head>
    <body>
        <div id="root" />
        <script src="/dist/TheMakeupApp.js" type="text/javascript"></script>
    </body>
</html>