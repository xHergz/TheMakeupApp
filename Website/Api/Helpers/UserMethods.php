<?php
    require_once __DIR__.'/../Data/Errors.php';
    require_once __DIR__.'/../DataAccessLayer/UserDal.php';

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