<?php
    require_once __DIR__.'/../Common/Utilities.php';
    require_once __DIR__.'/../Data/Errors.php';
    require_once __DIR__.'/../DataAccessLayer/UserDal.php';

    function CreateUser($user) {
        $userDal = new UserDal();
        if (!$userDal->Initialize()) {
            return Errors::DATABASE_INITIALIZATION_ERROR;
        }

        // Add the user to the db
        $passwordHash = password_hash($user->Password, PASSWORD_DEFAULT);
        $createUserResponse = $userDal->CreateUser($user->Email, $passwordHash, $user->DisplayName, $user->FirstName, $user->LastName);
        if ($createUserResponse->Status != Errors::SUCCESS) {
            return $createUserResponse->Status;
        }

        // Create a session for the user and redirect to the homepage
        $createSessionResponse = $userDal->CreateSession($createUserResponse->NewUserId, GetClientIp());
        if ($createSessionResponse->Status != Errors::SUCCESS) {
            return $createSessionResponse->Status;
        }

        // Log user creation and set session key cookie
        $userDal->LogUserCreation($createSessionResponse->NewSessionKey);
        SetSessionKey($createSessionResponse->NewSessionKey);
        return Errors::SUCCESS;
    }

    function LoginUser($user) {
        $userDal = new UserDal();
        if (!$userDal->Initialize()) {
            return Errors::DATABASE_INITIALIZATION_ERROR;
        }

        // Get the users password hash to check against
        $getUsersPasswordHashResponse = $userDal->GetUsersPasswordHash($user->Email);
        if ($getUsersPasswordHashResponse->Status != Errors::SUCCESS) {
            return $getUsersPasswordHashResponse->Status;
        }

        // Verify the entered password matches the hash
        if (!password_verify($user->Password, $getUsersPasswordHashResponse->PasswordHash)) {
            return Errors::PASSWORD_INVALID;
        }

        // Create a session for the user
        $createSessionResponse = $userDal->CreateSession($getUsersPasswordHashResponse->UserId, GetClientIp());
        if ($createSessionResponse->Status != Errors::SUCCESS) {
            return $createSessionResponse->Status;
        }

        // Set the session cookie
        SetSessionKey($createSessionResponse->NewSessionKey);
        return Errors::SUCCESS;
    }

    function LogoutUser() {
        $userDal = new UserDal();
        if (!$userDal->Initialize()) {
            return Errors::DATABASE_INITIALIZATION_ERROR;
        }

        $deactivateSessionResponse = $userDal->DeactivateSession(GetSessionKey());
        if ($deactivateSessionResponse->Status != Errors::SUCCESS) {
            return $deactivateSessionResponse->Status;
        }

        EndSession();
        return Errors::SUCCESS;
    }

    function AuthorizeUser($sessionKey) {
        if ($sessionKey == null) {
            return Errors::NO_SESSION_KEY;
        }

        $userDal = new UserDal();
        if (!$userDal->Initialize()) {
            $userDal->Close();
            return Errors::DATABASE_INITIALIZATION_ERROR;
        }

        if ($userDal->IsSessionKeyValid($sessionKey) != 0) {
            $userDal->Close();
            return Errors::INVALID_SESSION_KEY;
        }

        $userDal->Close();
        return Errors::SUCCESS;
    }
?>