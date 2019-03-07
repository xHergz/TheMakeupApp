<?php
    require_once __DIR__.'/../Data/Errors.php';
    require_once __DIR__.'/../DataAccessLayer/AuthorizationDal.php';
    require_once __DIR__.'/../DataAccessLayer/UserDal.php';

    function AuthorizeSession($sessionKey) {
        if ($sessionKey == null) {
            return Errors::NO_SESSION_KEY;
        }

        $authorizationDal = new AuthorizationDal();
        if (!$authorizationDal->Initialize()) {
            $authorizationDal->Close();
            return Errors::DATABASE_INITIALIZATION_ERROR;
        }

        if ($authorizationDal->IsSessionKeyValid($sessionKey) != 0) {
            $authorizationDal->Close();
            return Errors::INVALID_SESSION_KEY;
        }

        $authorizationDal->Close();
        return Errors::SUCCESS;
    }

    function AuthorizeSessionForSession($requesterSessionKey, $queriedSessionKey) {
        $authorizationDal = new AuthorizationDal();
        if (!$authorizationDal->Initialize()) {
            $authorizationDal->Close();
            return Errors::DATABASE_INITIALIZATION_ERROR;
        }

        if (!$authorizationDal->IsSessionAuthorizedForSession($requesterSessionKey, $queriedSessionKey)) {
            $authorizationDal->Close();
            return Errors::SESSION_KEY_NOT_AUTHORIZED_FOR_SESSION;
        }

        $authorizationDal->Close();
        return Errors::SUCCESS;
    }

    function AuthorizeSessionForDisplayName($sessionKey, $displayName) {
        $userDal = new UserDal();
        if (!$userDal->Initialize()) {
            $userDal->Close();
            return Errors::DATABASE_INITIALIZATION_ERROR;
        }

        $userId = $userDal->GetUserIdByDisplayName($displayName);
        if ($userId == null) {
            $userDal->Close();
            return Errors::DISPLAY_NAME_DOES_NOT_EXIST;
        }

        $userDal->Close();
        return AuthorizeSessionForUser($sessionKey, $userId);
    }

    function AuthorizeSessionForUser($sessionKey, $userId) {
        $authorizationDal = new AuthorizationDal();
        if (!$authorizationDal->Initialize()) {
            $authorizationDal->Close();
            return Errors::DATABASE_INITIALIZATION_ERROR;
        }

        if (!$authorizationDal->DoesSessionOwnUser($sessionKey, $userId)) {
            $authorizationDal->Close();
            return Errors::USER_DOES_NOT_BELONG_TO_SESSION;
        }

        $authorizationDal->Close();
        return Errors::SUCCESS;
    }

    function AuthorizeSessionForClientProfile($sessionKey, $clientProfileId) {
        $authorizationDal = new AuthorizationDal();
        if (!$authorizationDal->Initialize()) {
            $authorizationDal->Close();
            return Errors::DATABASE_INITIALIZATION_ERROR;
        }

        if (!$authorizationDal->DoesSessionOwnClientProfile($sessionKey, $clientProfileId)) {
            $authorizationDal->Close();
            return Errors::CLIENT_PROFILE_DOES_NOT_BELONG_TO_SESSION;
        }

        $authorizationDal->Close();
        return Errors::SUCCESS;
    }

    function AuthorizeSessionIsArtist($sessionKey) {
        $authorizationDal = new AuthorizationDal();
        if (!$authorizationDal->Initialize()) {
            $authorizationDal->Close();
            return Errors::DATABASE_INITIALIZATION_ERROR;
        }

        $userId = $authorizationDal->GetUserIdBySessionKey($sessionKey);
        if (!$authorizationDal->IsUserArtist($userId)) {
            $authorizationDal->Close();
            return Errors::USER_IS_NOT_ARTIST;
        }

        $authorizationDal->Close();
        return Errors::SUCCESS;
    }
?>