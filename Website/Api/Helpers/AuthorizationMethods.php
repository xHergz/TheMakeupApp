<?php
    require_once __DIR__.'/../Data/Errors.php';
    require_once __DIR__.'/../DataAccessLayer/AuthorizationDal.php';
    require_once __DIR__.'/../DataAccessLayer/ClientProfileDal.php';
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

    function GetUserIdBySessionKey($sessionKey) {
        $authorizationDal = new AuthorizationDal();
        if (!$authorizationDal->Initialize()) {
            $authorizationDal->Close();
            return null;
        }

        $userId = $authorizationDal->GetUserIdBySessionKey($sessionKey);
        $authorizationDal->Close();
        return $userId;
    }

    function GetClientProfileIdBySessionKey($sessionKey) {
        $authorizationDal = new AuthorizationDal();
        if (!$authorizationDal->Initialize()) {
            $authorizationDal->Close();
            return null;
        }

        $clientProfileId = $authorizationDal->GetClientProfileIdBySessionKey($sessionKey);
        $authorizationDal->Close();
        return $clientProfileId;
    }

    function AuthorizeSessionForClientProfileByDisplayName($sessionKey, $displayName) {
        $clientProfileDal = new ClientProfileDal();
        if (!$clientProfileDal->Initialize()) {
            $clientProfileDal->Close();
            return Errors::DATABASE_INITIALIZATION_ERROR;
        }

        $clientProfileId = $clientProfileDal->GetClientProfileIdByDisplayName($displayName);
        if ($clientProfileId == null) {
            $clientProfileDal->Close();
            return Errors::DISPLAY_NAME_DOES_NOT_EXIST;
        }

        $clientProfileDal->Close();
        return AuthorizeSessionForClientProfile($sessionKey, $clientProfileId);
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

    function AuthorizeSessionForClientHeadshot($sessionKey, $clientHeadshotId) {
        $authorizationDal = new AuthorizationDal();
        if (!$authorizationDal->Initialize()) {
            $authorizationDal->Close();
            return Errors::DATABASE_INITIALIZATION_ERROR;
        }

        if (!$authorizationDal->DoesSessionOwnClientHeadshot($sessionKey, $clientHeadshotId)) {
            $authorizationDal->Close();
            return Errors::CLIENT_HEADSHOT_DOES_NOT_BELONG_TO_SESSION;
        }

        $authorizationDal->Close();
        return Errors::SUCCESS;
    }

    function AuthorizeSessionForClientReview($sessionKey, $clientReviewId) {
        $authorizationDal = new AuthorizationDal();
        if (!$authorizationDal->Initialize()) {
            $authorizationDal->Close();
            return Errors::DATABASE_INITIALIZATION_ERROR;
        }

        if (!$authorizationDal->DoesSessionOwnClientReview($sessionKey, $clientReviewId)) {
            $authorizationDal->Close();
            return Errors::CLIENT_REVIEW_DOES_NOT_BELONG_TO_SESSION;
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

    function AuthorizeSessionForArtistPortfolio($sessionKey, $artistPortfolioId) {
        $authorizationDal = new AuthorizationDal();
        if (!$authorizationDal->Initialize()) {
            $authorizationDal->Close();
            return Errors::DATABASE_INITIALIZATION_ERROR;
        }

        if (!$authorizationDal->DoesSessionOwnArtistPortfolio($sessionKey, $artistPortfolioId)) {
            $authorizationDal->Close();
            return Errors::ARTIST_PORTFOLIO_DOES_NOT_BELONG_TO_SESSION;
        }

        $authorizationDal->Close();
        return Errors::SUCCESS;
    }

    function AuthorizeSessionForArtistPortfolioPicture($sessionKey, $artistPortfolioPictureId) {
        $authorizationDal = new AuthorizationDal();
        if (!$authorizationDal->Initialize()) {
            $authorizationDal->Close();
            return Errors::DATABASE_INITIALIZATION_ERROR;
        }

        if (!$authorizationDal->DoesSessionOwnArtistPortfolioPicture($sessionKey, $artistPortfolioPictureId)) {
            $authorizationDal->Close();
            return Errors::ARTIST_PORTFOLIO_PICTURE_DOES_NOT_BELONG_TO_SESSION;
        }

        $authorizationDal->Close();
        return Errors::SUCCESS;
    }

    function AuthorizeSessionForArtistQualification($sessionKey, $artistQualificationId) {
        $authorizationDal = new AuthorizationDal();
        if (!$authorizationDal->Initialize()) {
            $authorizationDal->Close();
            return Errors::DATABASE_INITIALIZATION_ERROR;
        }

        if (!$authorizationDal->DoesSessionOwnArtistQualification($sessionKey, $artistQualificationId)) {
            $authorizationDal->Close();
            return Errors::ARTIST_QUALIFICATION_DOES_NOT_BELONG_TO_SESSION;
        }

        $authorizationDal->Close();
        return Errors::SUCCESS;
    }

    function AuthorizeSessionForArtistMakeoverOffered($sessionKey, $artistMakeoverOfferedId) {
        $authorizationDal = new AuthorizationDal();
        if (!$authorizationDal->Initialize()) {
            $authorizationDal->Close();
            return Errors::DATABASE_INITIALIZATION_ERROR;
        }

        if (!$authorizationDal->DoesSessionOwnArtistMakeoverOffered($sessionKey, $artistMakeoverOfferedId)) {
            $authorizationDal->Close();
            return Errors::ARTIST_MAKEOVER_OFFERED_DOES_NOT_BELONG_TO_SESSION;
        }

        $authorizationDal->Close();
        return Errors::SUCCESS;
    }

    function AuthorizeSessionForArtistService($sessionKey, $artistServiceId) {
        $authorizationDal = new AuthorizationDal();
        if (!$authorizationDal->Initialize()) {
            $authorizationDal->Close();
            return Errors::DATABASE_INITIALIZATION_ERROR;
        }

        if (!$authorizationDal->DoesSessionOwnArtistService($sessionKey, $artistServiceId)) {
            $authorizationDal->Close();
            return Errors::ARTIST_SERVICE_DOES_NOT_BELONG_TO_SESSION;
        }

        $authorizationDal->Close();
        return Errors::SUCCESS;
    }

    function AuthorizeSessionForArtistServiceAddon($sessionKey, $artistServiceAddonId) {
        $authorizationDal = new AuthorizationDal();
        if (!$authorizationDal->Initialize()) {
            $authorizationDal->Close();
            return Errors::DATABASE_INITIALIZATION_ERROR;
        }

        if (!$authorizationDal->DoesSessionOwnArtistServiceAddon($sessionKey, $artistServiceAddonId)) {
            $authorizationDal->Close();
            return Errors::ARTIST_SERVICE_ADDON_DOES_NOT_BELONG_TO_SESSION;
        }

        $authorizationDal->Close();
        return Errors::SUCCESS;
    }

    function AuthorizeSessionForArtistServiceConsultation($sessionKey, $artistServiceConsultationId) {
        $authorizationDal = new AuthorizationDal();
        if (!$authorizationDal->Initialize()) {
            $authorizationDal->Close();
            return Errors::DATABASE_INITIALIZATION_ERROR;
        }

        if (!$authorizationDal->DoesSessionOwnArtistServiceConsultation($sessionKey, $artistServiceConsultationId)) {
            $authorizationDal->Close();
            return Errors::ARTIST_SERVICE_CONSULTATION_DOES_NOT_BELONG_TO_SESSION;
        }

        $authorizationDal->Close();
        return Errors::SUCCESS;
    }
?>