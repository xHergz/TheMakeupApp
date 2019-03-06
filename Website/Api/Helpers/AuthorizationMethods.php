<?php
    require_once __DIR__.'/../Data/Errors.php';
    require_once __DIR__.'/../DataAccessLayer/AuthorizationDal.php';

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
        $authorizationDal = new AuthorizationDal();
        if (!$authorizationDal->Initialize()) {
            $authorizationDal->Close();
            return Errors::DATABASE_INITIALIZATION_ERROR;
        }

        $userId = $authorizationDal->GetUserIdByDisplayName($displayName);
        if ($userId == null) {
            $authorizationDal->Close();
            return Errors::DISPLAY_NAME_DOES_NOT_EXIST;
        }

        $authorizationDal->Close();
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
?>