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

        if ($user->IsValid()) {
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
            $errorList->AddErrors($user->GetErrors());
        }
    }
?>
<html>
    <head>
        <title>Sign Up - The Makeup App</title>
    </head>
    <body>
        <?php include_once '../../private/Templates/ErrorList.php'; ?>
        <form method="post">
            Email:<br>
            <input type="text" name="email"><br>
            Password:<br>
            <input type="password" name="password"><br>
            Confirm Password:<br>
            <input type="password" name="confirmPassword"><br>
            Display Name:<br>
            <input type="text" name="displayName"><br>
            First Name:<br>
            <input type="text" name="firstName"><br>
            Last Name:<br>
            <input type="text" name="lastName"><br><br>
            <input type="submit" value="Submit">
        </form>
    </body>
</html>
