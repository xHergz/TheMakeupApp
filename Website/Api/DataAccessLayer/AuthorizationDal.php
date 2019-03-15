<?php
    require_once __DIR__.'/../Common/DataAccessLayer.php';

    define("IsSessionKeyValid", "IsSessionKeyValid");
    define("IsSessionAuthorizedForSession", "IsSessionAuthorizedForSession");
    define("DoesSessionOwnUser", "DoesSessionOwnUser");
    define("DoesSessionOwnClientProfile", "DoesSessionOwnClientProfile");
    define("DoesSessionOwnClientHeadshot", "DoesSessionOwnClientHeadshot");
    define("DoesSessionOwnClientReview", "DoesSessionOwnClientReview");
    define("GetUserIdBySessionKey", "GetUserIdBySessionKey");
    define("GetClientProfileIdBySessionKey", "GetClientProfileIdBySessionKey");
    define("IsUserArtist", "IsUserArtist");
    define("DoesSessionOwnArtistPortfolio", "DoesSessionOwnArtistPortfolio");
    define("DoesSessionOwnArtistPortfolioPicture", "DoesSessionOwnArtistPortfolioPicture");
    define("DoesSessionOwnArtistQualification", "DoesSessionOwnArtistQualification");
    define("DoesSessionOwnArtistMakeoverOffered", "DoesSessionOwnArtistMakeoverOffered");
    define("DoesSessionOwnArtistService", "DoesSessionOwnArtistService");
    define("DoesSessionOwnArtistServiceAddon", "DoesSessionOwnArtistServiceAddon");
    define("DoesSessionOwnArtistServiceConsultation", "DoesSessionOwnArtistServiceConsultation");
    define("IsSessionAuthorizedForMakeoverAppointment", "IsSessionAuthorizedForMakeoverAppointment");

    class AuthorizationDal extends DataAccessLayer {
        public function IsSessionKeyValid($sessionKey) {
            $parameterArray = array(
                new DatabaseParameter($sessionKey, PDO::PARAM_STR, '_sessionKey', ParameterDirection::IN)
            );
            return $this->_connectionInfo->ExecuteFunction(IsSessionKeyValid, $parameterArray);
        }

        public function IsSessionAuthorizedForSession($requesterSessionKey, $queriedSessionKey) {
            $parameterArray = array(
                new DatabaseParameter($requesterSessionKey, PDO::PARAM_STR, '_requesterSessionKey', ParameterDirection::IN),
                new DatabaseParameter($queriedSessionKey, PDO::PARAM_STR, '_queriedSessionKey', ParameterDirection::IN)
            );
            return $this->_connectionInfo->ExecuteFunction(IsSessionAuthorizedForSession, $parameterArray);
        }

        public function DoesSessionOwnUser($sessionKey, $userId) {
            $parameterArray = array(
                new DatabaseParameter($sessionKey, PDO::PARAM_STR, '_sessionKey', ParameterDirection::IN),
                new DatabaseParameter($userId, PDO::PARAM_INT, '_userId', ParameterDirection::IN)
            );
            return $this->_connectionInfo->ExecuteFunction(DoesSessionOwnUser, $parameterArray);
        }

        public function DoesSessionOwnClientProfile($sessionKey, $clientProfileId) {
            $parameterArray = array(
                new DatabaseParameter($sessionKey, PDO::PARAM_STR, '_sessionKey', ParameterDirection::IN),
                new DatabaseParameter($clientProfileId, PDO::PARAM_INT, '_clientProfileId', ParameterDirection::IN)
            );
            return $this->_connectionInfo->ExecuteFunction(DoesSessionOwnClientProfile, $parameterArray);
        }

        public function DoesSessionOwnClientHeadshot($sessionKey, $clientHeadshotId) {
            $parameterArray = array(
                new DatabaseParameter($sessionKey, PDO::PARAM_STR, '_sessionKey', ParameterDirection::IN),
                new DatabaseParameter($clientHeadshotId, PDO::PARAM_INT, '_clientHeadshotId', ParameterDirection::IN)
            );
            return $this->_connectionInfo->ExecuteFunction(DoesSessionOwnClientHeadshot, $parameterArray);
        }

        public function DoesSessionOwnClientReview($sessionKey, $clientReviewId) {
            $parameterArray = array(
                new DatabaseParameter($sessionKey, PDO::PARAM_STR, '_sessionKey', ParameterDirection::IN),
                new DatabaseParameter($clientReviewId, PDO::PARAM_INT, '_clientReviewId', ParameterDirection::IN)
            );
            return $this->_connectionInfo->ExecuteFunction(DoesSessionOwnClientReview, $parameterArray);
        }

        public function GetUserIdBySessionKey($sessionKey) {
            $parameterArray = array(
                new DatabaseParameter($sessionKey, PDO::PARAM_STR, '_sessionKey', ParameterDirection::IN)
            );
            return $this->_connectionInfo->ExecuteFunction(GetUserIdBySessionKey, $parameterArray);
        }

        public function GetClientProfileIdBySessionKey($sessionKey) {
            $parameterArray = array(
                new DatabaseParameter($sessionKey, PDO::PARAM_STR, '_sessionKey', ParameterDirection::IN)
            );
            return $this->_connectionInfo->ExecuteFunction(GetClientProfileIdBySessionKey, $parameterArray);
        }

        public function IsUserArtist($userId) {
            $parameterArray = array(
                new DatabaseParameter($userId, PDO::PARAM_STR, '_userId', ParameterDirection::IN)
            );
            return $this->_connectionInfo->ExecuteFunction(IsUserArtist, $parameterArray);
        }

        public function DoesSessionOwnArtistPortfolio($sessionKey, $artistPortfolioId) {
            $parameterArray = array(
                new DatabaseParameter($sessionKey, PDO::PARAM_STR, '_sessionKey', ParameterDirection::IN),
                new DatabaseParameter($artistPortfolioId, PDO::PARAM_INT, '_artistPortfolioId', ParameterDirection::IN)
            );
            return $this->_connectionInfo->ExecuteFunction(DoesSessionOwnArtistPortfolio, $parameterArray);
        }

        public function DoesSessionOwnArtistPortfolioPicture($sessionKey, $artistPortfolioPictureId) {
            $parameterArray = array(
                new DatabaseParameter($sessionKey, PDO::PARAM_STR, '_sessionKey', ParameterDirection::IN),
                new DatabaseParameter($artistPortfolioPictureId, PDO::PARAM_INT, '_artistPortfolioPictureId', ParameterDirection::IN)
            );
            return $this->_connectionInfo->ExecuteFunction(DoesSessionOwnArtistPortfolioPicture, $parameterArray);
        }

        public function DoesSessionOwnArtistQualification($sessionKey, $artistQualificationId) {
            $parameterArray = array(
                new DatabaseParameter($sessionKey, PDO::PARAM_STR, '_sessionKey', ParameterDirection::IN),
                new DatabaseParameter($artistQualificationId, PDO::PARAM_INT, '_artistQualificationId', ParameterDirection::IN)
            );
            return $this->_connectionInfo->ExecuteFunction(DoesSessionOwnArtistQualification, $parameterArray);
        }

        public function DoesSessionOwnArtistMakeoverOffered($sessionKey, $artistMakeoverOfferedId) {
            $parameterArray = array(
                new DatabaseParameter($sessionKey, PDO::PARAM_STR, '_sessionKey', ParameterDirection::IN),
                new DatabaseParameter($artistMakeoverOfferedId, PDO::PARAM_INT, '_artistMakeoverOfferedId', ParameterDirection::IN)
            );
            return $this->_connectionInfo->ExecuteFunction(DoesSessionOwnArtistMakeoverOffered, $parameterArray);
        }

        public function DoesSessionOwnArtistService($sessionKey, $artistServiceId) {
            $parameterArray = array(
                new DatabaseParameter($sessionKey, PDO::PARAM_STR, '_sessionKey', ParameterDirection::IN),
                new DatabaseParameter($artistServiceId, PDO::PARAM_INT, '_artistServiceId', ParameterDirection::IN)
            );
            return $this->_connectionInfo->ExecuteFunction(DoesSessionOwnArtistService, $parameterArray);
        }

        public function DoesSessionOwnArtistServiceAddon($sessionKey, $artistServiceAddonId) {
            $parameterArray = array(
                new DatabaseParameter($sessionKey, PDO::PARAM_STR, '_sessionKey', ParameterDirection::IN),
                new DatabaseParameter($artistServiceAddonId, PDO::PARAM_INT, '_artistServiceAddonId', ParameterDirection::IN)
            );
            return $this->_connectionInfo->ExecuteFunction(DoesSessionOwnArtistServiceAddon, $parameterArray);
        }

        public function DoesSessionOwnArtistServiceConsultation($sessionKey, $artistServiceConsultationId) {
            $parameterArray = array(
                new DatabaseParameter($sessionKey, PDO::PARAM_STR, '_sessionKey', ParameterDirection::IN),
                new DatabaseParameter($artistServiceConsultationId, PDO::PARAM_INT, '_artistServiceConsultationId', ParameterDirection::IN)
            );
            return $this->_connectionInfo->ExecuteFunction(DoesSessionOwnArtistServiceConsultation, $parameterArray);
        }

        public function IsSessionAuthorizedForMakeoverAppointment($sessionKey, $makeoverAppointmentId) {
            $parameterArray = array(
                new DatabaseParameter($sessionKey, PDO::PARAM_STR, '_sessionKey', ParameterDirection::IN),
                new DatabaseParameter($makeoverAppointmentId, PDO::PARAM_INT, '_makeoverAppointmentId', ParameterDirection::IN)
            );
            return $this->_connectionInfo->ExecuteFunction(IsSessionAuthorizedForMakeoverAppointment, $parameterArray);
        }
    }
?>
