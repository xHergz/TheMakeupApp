<?php
    require_once '../../private/Api/Common/Utilities.php';
    require_once '../../private/Api/Data/ErrorList.php';
    require_once '../../private/Api/Data/Errors.php';
    require_once '../../private/Api/Data/User.php';
    require_once '../../private/Api/DataAccessLayer/UserDal.php';

    $user = new User();
    $errorList = new ErrorList();

    if ($user->IsLoginInfoAvailable()) {
        $user->GetLoginInfo();

        if ($user->IsValidForLogin()) {
            $userDal = new UserDal();
            if($userDal->Initialize()){
                $getUserswordHashResponse = $userDal->GetUsersPasswordHash($user->Email);
                if ($getUserswordHashResponse['Result'] == Errors::SUCCESS) {
                    if (password_verify($user->Password, $getUserswordHashResponse['Password_Hash'])) {
                        $createSessionResponse = $userDal->CreateSession($getUserswordHashResponse['User_Id'], GetClientIp());
                        if ($createSessionResponse['Result'] == Errors::SUCCESS) {
                            $newSessionKey = $createSessionResponse['New_Session_Key'];
                            SetSessionKey($newSessionKey);
                            Redirect('/');
                        }
                    }
                    else {
                        $errorList->AddError(Errors::PASSWORD_INVALID);
                    }
                }
                else {
                    $errorList->AddError($getUserswordHashResponse['Result']);
                }
            }
            else {
                $errorList->AddError(Errors::DATABASE_INITIALIZATION_ERROR);
            }
        }
        else {
            $errorList->AddErrors($user->GetLoginErrors());
        }
    }
?>
<html>
    <head>
        <title>Login - The Makeup App</title>
    </head>
    <body>
        <?php include_once '../../private/Templates/ErrorList.php'; ?>
        <form method="post">
            Email:<br>
            <input type="text" name="email"><br>
            Password:<br>
            <input type="password" name="password"><br>
            <input type="submit" value="Submit">
        </form>
    </body>
</html>