<?php
    require_once "../../private/Api/Common/Utilities.php";
    require_once "../../private/Api/Data/ErrorList.php";
    require_once "../../private/Api/Data/Errors.php";
    require_once '../../private/Api/Helpers/UserMethods.php';

    $errorList = new ErrorList();
    $sessionKey = GetSessionKey();
    $authorizeUserResponse = AuthorizeUser($sessionKey);
    if ($authorizeUserResponse != Errors::SUCCESS) {
        $errorList->AddError($authorizeUserResponse);
        Redirect('/login');
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