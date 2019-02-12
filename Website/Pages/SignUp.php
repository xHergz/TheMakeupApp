<?php
    require_once '../../private/Api/Common/Utilities.php';
    require_once '../../private/Api/Data/ErrorList.php';
    require_once '../../private/Api/Data/Errors.php';
    require_once '../../private/Api/Data/User.php';
    require_once '../../private/Api/DataAccessLayer/UserDal.php';
    

    $user = new User();
    $errorList = new ErrorList();

    if ($user->IsSignUpInfoAvailable()) {
        $user->GetSignUpInfo();

        if ($user->IsValidForSignUp()) {
            $userDal = new UserDal();
            if($userDal->Initialize()){
                // Add the user to the db
                $passwordHash = password_hash($user->Password, PASSWORD_DEFAULT);
                $createUserResponse = $userDal->CreateUser($user->Email, $passwordHash, $user->DisplayName, $user->FirstName, $user->LastName);
                if ($createUserResponse['Result'] == Errors::SUCCESS) {
                    // Create a session for the user and redirect to the homepage
                    $createSessionResponse = $userDal->CreateSession($createUserResponse['New_User_Id'], GetClientIp());
                    if ($createSessionResponse['Result'] == Errors::SUCCESS) {
                        $newSessionKey = $createSessionResponse['New_Session_Key'];
                        $userDal->LogUserCreation($newSessionKey);
                        SetSessionKey($newSessionKey);
                        Redirect('/');
                    }
                }
                else {
                    $errorList->AddError($createUserResponse['Result']);
                }
            }
            else {
                $errorList->AddError(Errors::DATABASE_INITIALIZATION_ERROR);
            }
        }
        else {
            $errorList->AddErrors($user->GetSignUpErrors());
        }
    }
?>
<html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
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
