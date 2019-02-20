<?php
    require_once __DIR__.'/../Common/DataAccessLayer.php';
    require_once __DIR__.'/Dto/SessionDto.php';
    require_once __DIR__.'/Response/CreateSessionResponse.php';
    require_once __DIR__.'/Response/CreateUserResponse.php';
    require_once __DIR__.'/Response/GetSessionInfoResponse.php';
    require_once __DIR__.'/Response/GetUsersPasswordHashResponse.php';
    require_once __DIR__.'/Response/StatusResponse.php';

    define("CreateUser", "CreateUser");
    define("GetUsersPasswordHash", "GetUsersPasswordHash");
    define("CreateSession", "CreateSession");
    define("DeactivateSession", "DeactivateSession");
    define("LogUserCreation", "LogUserCreation");
    define("IsSessionKeyValid", "IsSessionKeyValid");
    define("GetSessionInfo", "GetSessionInfo");
    define("IsSessionAuthorizedForSession", "IsSessionAuthorizedForSession");
    define("DoesSessionOwnUser", "DoesSessionOwnUser");

    class UserDal extends DataAccessLayer {
        public function CreateUser($email, $password, $displayName, $firstName, $lastName) {
            $parameterArray = array(
                new DatabaseParameter($email, PDO::PARAM_STR, '_email', ParameterDirection::IN),
                new DatabaseParameter($password, PDO::PARAM_STR, '_passwordHash', ParameterDirection::IN),
                new DatabaseParameter($displayName, PDO::PARAM_STR, '_displayName', ParameterDirection::IN),
                new DatabaseParameter($firstName, PDO::PARAM_STR, '_firstName', ParameterDirection::IN),
                new DatabaseParameter($lastName, PDO::PARAM_STR, '_lastName', ParameterDirection::IN),
                new DatabaseParameter(Status, PDO::PARAM_STR, '_status', ParameterDirection::OUT)
            );
            $procResponse = $this->_connectionInfo->ExecuteStoredProcedure(CreateUser, null, $parameterArray);
            $responseRow = $procResponse->GetSingleRow();
            return new CreateUserResponse($procResponse->Outputs[Status], $responseRow['New_User_Id']);
        }

        public function GetUsersPasswordHash($email) {
            $parameterArray = array(
                new DatabaseParameter($email, PDO::PARAM_STR, '_email', ParameterDirection::IN),
                new DatabaseParameter(Status, PDO::PARAM_STR, '_status', ParameterDirection::OUT)
            );
            $procResponse =  $this->_connectionInfo->ExecuteStoredProcedure(GetUsersPasswordHash, null, $parameterArray);
            $responseRow = $procResponse->GetSingleRow();
            return new GetUsersPasswordHashResponse($procResponse->Outputs[Status], $responseRow['User_Id'], $responseRow['Password_Hash']);
        }

        public function CreateSession($userId, $ipAddress) {
            $parameterArray = array(
                new DatabaseParameter($userId, PDO::PARAM_INT, '_userId', ParameterDirection::IN),
                new DatabaseParameter($ipAddress, PDO::PARAM_STR, '_ipAddress', ParameterDirection::IN),
                new DatabaseParameter(Status, PDO::PARAM_STR, '_status', ParameterDirection::OUT)
            );
            $procResponse =  $this->_connectionInfo->ExecuteStoredProcedure(CreateSession, null, $parameterArray);
            $responseRow = $procResponse->GetSingleRow();
            return new CreateSessionResponse($procResponse->Outputs[Status], $responseRow['New_Session_Key']);
        }

        public function DeactivateSession($sessionKey) {
            $parameterArray = array(
                new DatabaseParameter($sessionKey, PDO::PARAM_STR, '_sessionKey', ParameterDirection::IN),
                new DatabaseParameter(Status, PDO::PARAM_STR, '_status', ParameterDirection::OUT)
            );
            $procResponse =  $this->_connectionInfo->ExecuteStoredProcedure(DeactivateSession, null, $parameterArray);
            return new StatusResponse($procResponse->Outputs[Status]);
        }

        public function LogUserCreation($sessionKey) {
            $parameterArray = array(
                new DatabaseParameter($sessionKey, PDO::PARAM_STR, '_sessionKey', ParameterDirection::IN)
            );
            $this->_connectionInfo->ExecuteStoredProcedure(LogUserCreation, null, $parameterArray);
        }

        public function IsSessionKeyValid($sessionKey) {
            $parameterArray = array(
                new DatabaseParameter($sessionKey, PDO::PARAM_STR, '_sessionKey', ParameterDirection::IN)
            );
            return $this->_connectionInfo->ExecuteFunction(IsSessionKeyValid, $parameterArray);
        }

        public function GetSessionInfo($sessionKey) {
            $parameterArray = array(
                new DatabaseParameter($sessionKey, PDO::PARAM_STR, '_sessionKey', ParameterDirection::IN),
                new DatabaseParameter(Status, PDO::PARAM_STR, '_status', ParameterDirection::OUT)
            );
            $procResponse =  $this->_connectionInfo->ExecuteStoredProcedure(GetSessionInfo, 'SessionDto', $parameterArray);
            return new GetSessionInfoResponse($procResponse->Outputs[Status], $procResponse->GetSingleRow());
        }

        public function IsSessionAuthorizedForSession($requesterSessionKey, $queriedSessionKey) {
            $parameterArray = array(
                new DatabaseParameter($requesterSessionKey, PDO::PARAM_STR, '_requesterSessionKey', ParameterDirection::IN),
                new DatabaseParameter($queriedSessionKey, PDO::PARAM_STR, '_queriedSessionKey', ParameterDirection::IN)
            );
            return $this->_connectionInfo->ExecuteFunction(IsSessionAuthorizedForSession, $parameterArray);
        }

        public function DoesSessionOwnUser($sessionKey, $displayName) {
            $parameterArray = array(
                new DatabaseParameter($sessionKey, PDO::PARAM_STR, '_sessionKey', ParameterDirection::IN),
                new DatabaseParameter($displayName, PDO::PARAM_STR, '_displayName', ParameterDirection::IN)
            );
            return $this->_connectionInfo->ExecuteFunction(DoesSessionOwnUser, $parameterArray);
        }
    }
?>
