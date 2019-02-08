<?php
    require '../../private/Api/Common/Utilities.php';
    require '../../private/Api/Data/Errors.php';
    require '../../private/Api/Data/User.php';
    require '../../private/Api/DataAccessLayer/UserDal.php';
    

    $user = new User();
    $errorList = array();

    if ($user->IsSignUpInfoAvailable()) {
        $user->GetSignUpInfo();

        if ($user->PasswordIsConfirmed()) {
            $userDal = new UserDal();
            if($userDal->Initialize()){
                // Add the user to the db
                $passwordHash = password_hash($user->Password, PASSWORD_DEFAULT);
                $createUserResponse = $userDal->CreateUser($user->Email, $passwordHash, $user->DisplayName, $user->FirstName, $user->LastName);
                var_dump($createUserResponse);
                if ($createUserResponse['Result'] == Errors::SUCCESS) {
                    // Create a session for the user and redirect to the homepage
                    $createSessionResponse = $userDal->CreateSession($createUserResponse['New_User_Id'], GetClientIp());
                    var_dump($createSessionResponse);
                    if ($createSessionResponse['Result'] == Errors::SUCCESS) {
                        SetSessionKey($createSessionResponse['New_Session_Key']);
                        Redirect('/');
                    }
                }
                else {
                    array_push($errorList, Errors::GetErrorMessage($createUserResponse['Result']));
                }
            }
            else {
                array_push($errorList, "Could not initialize the database connection.");
            }
        }
        else {
            array_push($errorList, "Passwords don't match.");
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
