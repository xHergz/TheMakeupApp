<?php
    require_once "../../private/Api/Common/Utilities.php";
    require_once "../../private/Api/Data/ErrorList.php";
    require_once "../../private/Api/Data/Errors.php";
    require_once '../../private/Api/Helpers/AuthorizationMethods.php';

    $errorList = new ErrorList();
    $sessionKey = GetSessionKey();
    $authorizeSessionResponse = AuthorizeSession($sessionKey);
    if ($authorizeSessionResponse != Errors::SUCCESS) {
        $errorList->AddError($authorizeSessionResponse);
        Redirect('/login');
    }
?>
<html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="mobile-web-app-capable" content="yes">
        <link rel="manifest" href="/manifest.json">
        <title>The Makeup App</title>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.4.0/dist/leaflet.css"
        integrity="sha512-puBpdR0798OZvTTbP4A8Ix/l+A4dHDD0DGqYW6RQ+9jxkRFclaxxQb/SJAWZfWAkuyeQUytO7+7N4QKrDh+drA=="
        crossorigin=""/>
    </head>
    <body>
        <div id="root" />
        <script src="/dist/TheMakeupApp.js" type="text/javascript"></script>
    </body>
</html>