<?php
    require_once '../../private/Api/Common/Utilities.php';
    require_once '../../private/Api/Data/ErrorList.php';
    require_once '../../private/Api/Helpers/UserMethods.php';

    function LogoutPage() {
        $errorList = new ErrorList();

        // Log out the user
        $logoutUseStatus = LogoutUser();
        if ($logoutUseStatus != Errors::SUCCESS) {
            $errorList->AddError($logoutUseStatus);
            return $errorList;
        }

        Redirect('/');
        return $errorList;
    }
    
    $errorList = LogoutPage();
?>
<html>
    <head>
        <title>Logout - The Makeup App</title>
    </head>
    <body>
        <?php include_once '../../private/Templates/ErrorList.php'; ?>
    </body>
</html>
