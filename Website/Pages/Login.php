<?php
    require_once '../../private/Api/Common/Utilities.php';
    require_once '../../private/Api/Data/ErrorList.php';
    require_once '../../private/Api/Data/Errors.php';
    require_once '../../private/Api/Data/User.php';
    require_once '../../private/Api/Helpers/UserMethods.php';

    function LoginPage() {
        $user = new User();
        $errorList = new ErrorList();

        // Check if the form is filled out for creating a user
        if (!$user->IsLoginInfoAvailable()) {
            return $errorList;
        }

        $user->GetLoginInfo();
        if (!$user->IsValidForLogin()) {
            $errorList->AddErrors($user->GetLoginErrors());
            return $errorList;
        }
        
        $loginUserStatus = LoginUser($user);
        if ($loginUserStatus != Errors::SUCCESS) {
            $errorList->AddError($loginUserStatus);
            return $errorList;
        }
        
        Redirect('/');
        return $errorList;
    }
    
    $errorList = LoginPage();
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