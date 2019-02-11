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
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" type="text/css" href="/css/TheMakeupApp.css">
        <link rel="stylesheet" type="text/css" href="/css/Login.css">
        <script type="text/javascript" src="/scripts/Validation.js" async></script>
        <script type="text/javascript" src="/scripts/Utilities.js" async></script>
        <script type="text/javascript" src="/scripts/User.js" async></script>
        <title>Login - The Makeup App</title>
    </head>
    <body>
        <?php include_once '../../private/Templates/Header.php'; ?>
        <div class="page-content">
            <?php include_once '../../private/Templates/ErrorList.php'; ?>
            <form class="login-form" method="post" onsubmit="return submitLogin()">
                <h2>Login</h2>
                Email:<br>
                <input id="emailInput" type="text" name="email" onchange="isEmailValid()"><br>
                Password:<br>
                <input id="passwordInput" type="password" name="password"><br><br>
                <input type="submit" value="Log In">
            </form>
            <div class="new-user-message">
                Don't have an account? <a href="/signup">Sign Up!</a>
            </div>
        </div>  
        <?php include_once '../../private/Templates/Footer.php'; ?>
    </body>
</html>