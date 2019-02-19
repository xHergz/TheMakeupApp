<?php
    require_once __DIR__.'/../Common/DataAccessLayer.php';
    require_once __DIR__.'/Dto/User.php';
    require_once __DIR__.'/Response/DalResponse.php';

    define("CreateUser", "CreateUser");
    define("GetUsersPasswordHash", "GetUsersPasswordHash");
    define("CreateSession", "CreateSession");
    define("DeactivateSession", "DeactivateSession");
    define("LogUserCreation", "LogUserCreation");
    define("IsSessionKeyValid", "IsSessionKeyValid");
    define("GetSessionInfo", "GetSessionInfo");

    class UserDal extends DataAccessLayer {
        public function CreateUser($email, $password, $displayName, $firstName, $lastName) {
            $parameterArray = array(
                new DatabaseParameter($email, PDO::PARAM_STR),
                new DatabaseParameter($password, PDO::PARAM_STR),
                new DatabaseParameter($displayName, PDO::PARAM_STR),
                new DatabaseParameter($firstName, PDO::PARAM_STR),
                new DatabaseParameter($lastName, PDO::PARAM_STR)
            );
            $procResponse = $this->_connectionInfo->ExecuteStoredProcedure(CreateUser, null, $parameterArray);
            return $procResponse->Results;
        }

        public function GetUsersPasswordHash($email) {
            $parameterArray = array(
                new DatabaseParameter($email, PDO::PARAM_STR)
            );
            $procResponse =  $this->_connectionInfo->ExecuteStoredProcedure(GetUsersPasswordHash, null, $parameterArray);
            return $procResponse->Results;
        }

        public function CreateSession($userId, $ipAddress) {
            $parameterArray = array(
                new DatabaseParameter($userId, PDO::PARAM_INT),
                new DatabaseParameter($ipAddress, PDO::PARAM_STR)
            );
            $procResponse =  $this->_connectionInfo->ExecuteStoredProcedure(CreateSession, null, $parameterArray);
            return $procResponse->Results;
        }

        public function DeactivateSession($sessionKey) {
            $parameterArray = array(
                new DatabaseParameter($sessionKey, PDO::PARAM_STR)
            );
            $procResponse =  $this->_connectionInfo->ExecuteStoredProcedure(DeactivateSession, null, $parameterArray);
            return $procResponse->Results;
        }

        public function LogUserCreation($sessionKey) {
            $parameterArray = array(
                new DatabaseParameter($sessionKey, PDO::PARAM_STR)
            );
            $procResponse =  $this->_connectionInfo->ExecuteStoredProcedure(LogUserCreation, null, $parameterArray);
            return $procResponse->Results;
        }

        public function IsSessionKeyValid($sessionKey) {
            $parameterArray = array(
                new DatabaseParameter($sessionKey, PDO::PARAM_STR)
            );
            return $this->_connectionInfo->ExecuteFunction(IsSessionKeyValid, $parameterArray);
        }

        public function GetSessionInfo($sessionKey) {
            $parameterArray = array(
                new DatabaseParameter($sessionKey, PDO::PARAM_STR, '_sessionKey', ParameterDirection::IN),
                new DatabaseParameter('@status', PDO::PARAM_STR, '_status', ParameterDirection::OUT)
            );
            $procResponse =  $this->_connectionInfo->ExecuteStoredProcedure(GetSessionInfo, 'User', $parameterArray);
            return new DalResponse($procResponse->Outputs['@status'], $procResponse->Results);
        }
    }
?>
