<?php
    require_once __DIR__.'/../Common/DataAccessLayer.php';

    define("IsSessionKeyValid", "IsSessionKeyValid");
    define("IsSessionAuthorizedForSession", "IsSessionAuthorizedForSession");
    define("DoesSessionOwnUser", "DoesSessionOwnUser");

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
    }
?>
