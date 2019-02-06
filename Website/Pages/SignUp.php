<?php
    require '../../private/Api/DataAccessLayer/UserDal.php';

    $errorList = array();

    if (isset($_POST["email"]) && isset($_POST["password"]) && isset($_POST["confirmPassword"]) && isset($_POST["displayName"])
        && isset($_POST["firstName"]) && isset($_POST["lastName"])) {
        $email = $_POST["email"];
        $password = $_POST["password"];
        $confirmPassword = $_POST["confirmPassword"];
        $displayName = $_POST["displayName"];
        $firstName = $_POST["firstName"];
        $lastName = $_POST["lastName"];

        if ($password == $confirmPassword) {
            $userDal = new UserDal();
            if($userDal->Initialize()){
                $createUserResponse = $userDal->CreateUser($email, $password, $displayName, $firstName, $lastName);
                var_dump($createUserResponse);
            }
            else{
                array_push($errorList, "Could not initialize the database connection.");
            }
        } else {
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
