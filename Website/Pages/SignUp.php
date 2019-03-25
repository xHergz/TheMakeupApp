<?php
    require_once '../../private/Api/Common/Utilities.php';
    require_once '../../private/Api/Data/ErrorList.php';
    require_once '../../private/Api/Data/Errors.php';
    require_once '../../private/Api/Data/User.php';
    require_once '../../private/Api/Helpers/UserMethods.php';

    function SignUpPage() {
        $user = new User();
        $errorList = new ErrorList();

        // Check if the form is filled out for creating a user
        if (!$user->IsSignUpInfoAvailable()) {
            return $errorList;
        }

        $user->GetSignUpInfo();
        if (!$user->IsValidForSignUp()) {
            $errorList->AddErrors($user->GetSignUpErrors());
            return $errorList;
        }
        
        $createUserStatus = CreateUser($user);
        if ($createUserStatus != Errors::SUCCESS) {
            $errorList->AddError($createUserStatus);
            return $errorList;
        }
        
        Redirect('/');
        return $errorList;
    }
    
    $errorList = SignUpPage();
?>
<html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="mobile-web-app-capable" content="yes">
        <link rel="manifest" href="/manifest.json">
        <link rel="stylesheet" type="text/css" href="/css/TheMakeupApp.css">
        <link rel="stylesheet" type="text/css" href="/css/SignUp.css">
        <script type="text/javascript" src="/scripts/Validation.js" async></script>
        <script type="text/javascript" src="/scripts/Utilities.js" async></script>
        <script type="text/javascript" src="/scripts/User.js" defer></script>
        <title>Sign Up - The Makeup App</title>
    </head>
    <body>
        <?php include_once '../../private/Templates/Header.php'; ?>
        <div class="page-content">
            <?php include_once '../../private/Templates/ErrorList.php'; ?>
            <form class="sign-up-form" method="post" onsubmit="return submitSignUp()">
                <h2>Sign Up</h2>
                Email:<br>
                <input id="emailInput" type="text" name="email" onchange="isEmailValid()"><br>
                Password:<br>
                <input id="passwordInput" type="password" name="password" onchange="isPasswordValid()"><br>
                Confirm Password:<br>
                <input id="confirmPasswordInput" type="password" name="confirmPassword" onchange="isPasswordConfirmed()"><br>
                Display Name:<br>
                <input id="displayNameInput" type="text" name="displayName" onchange="isDisplayNameValid()"><br>
                First Name:<br>
                <input id="firstNameInput"  type="text" name="firstName" onchange="isFirstNameValid()"><br>
                Last Name:<br>
                <input id="lastNameInput" type="text" name="lastName" onchange="isLastNameValid()"><br><br>
                <input type="submit" value="Sign Up">
            </form>
            <div class="existing-user-message">
                Already have an account? <a href="/login">Login!</a>
            </div>
        </div>
        <?php include_once '../../private/Templates/Footer.php'; ?>
    </body>
</html>
