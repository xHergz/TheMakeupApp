<?php
    require_once '../../private/Api/Common/Utilities.php';
    require_once '../../private/Api/Data/ErrorList.php';
    require_once '../../private/Api/DataAccessLayer/UserDal.php';
    
    $errorList = new ErrorList();
    $userDal = new UserDal();
    if($userDal->Initialize()){
        $deactivateSessionResponse = $userDal->DeactivateSession(GetSessionKey());
        if ($deactivateSessionResponse['Result'] == Errors::SUCCESS) {
            EndSession();
            Redirect('/');
        }
        else {
            $errorList->AddError($deactivateSessionResponse['Result']);
        }
    }
    else {
        $errorList->AddError(Errors::DATABASE_INITIALIZATION_ERROR);
    }
?>
<html>
    <head>
        <title>Logout - The Makeup App</title>
    </head>
    <body>
        <?php include_once '../../private/Templates/ErrorList.php'; ?>
    </body>
</html>
