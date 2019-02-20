<?php
    require_once __DIR__.'/../Common/DataAccessLayer.php';
    require_once __DIR__.'/Dto/NotificationDto.php';
    require_once __DIR__.'/Response/GetNewNotificationsResponse.php';
    require_once __DIR__.'/Response/GetNotificationsResponse.php';
    require_once __DIR__.'/Response/StatusResponse.php';

    define("AcknowledgeUserNotifications", "AcknowledgeUserNotifications");
    define("GetNumberOfNewUserNotifications", "GetNumberOfNewUserNotifications");
    define("GetUserNotifications", "GetUserNotifications");

    class NotificationsDal extends DataAccessLayer {
        public function AcknowledgeUserNotifications($displayName) {
            $parameterArray = array(
                new DatabaseParameter($displayName, PDO::PARAM_STR, '_displayName', ParameterDirection::IN),
                new DatabaseParameter(Status, PDO::PARAM_STR, '_status', ParameterDirection::OUT)
            );
            $procResponse = $this->_connectionInfo->ExecuteStoredProcedure(AcknowledgeUserNotifications, null, $parameterArray);
            $responseRow = $procResponse->GetSingleRow();
            return new StatusResponse($procResponse->Outputs[Status]);
        }

        public function GetNumberOfNewUserNotifications($displayName) {
            $parameterArray = array(
                new DatabaseParameter($displayName, PDO::PARAM_STR, '_displayName', ParameterDirection::IN),
                new DatabaseParameter(Status, PDO::PARAM_STR, '_status', ParameterDirection::OUT)
            );
            $procResponse = $this->_connectionInfo->ExecuteStoredProcedure(GetNumberOfNewUserNotifications, null, $parameterArray);
            $responseRow = $procResponse->GetSingleRow();
            return new GetNewNotificationsResponse($procResponse->Outputs[Status], $responseRow['New_Notifications']);
        }

        public function GetUserNotifications($displayName, $lastNotificationId = null) {
            $parameterArray = array(
                new DatabaseParameter($displayName, PDO::PARAM_STR, '_displayName', ParameterDirection::IN),
                new DatabaseParameter($lastNotificationId, PDO::PARAM_INT, '_lastNotificationId', ParameterDirection::IN),
                new DatabaseParameter(Status, PDO::PARAM_STR, '_status', ParameterDirection::OUT)
            );
            $procResponse = $this->_connectionInfo->ExecuteStoredProcedure(GetUserNotifications, null, $parameterArray);
            return new GetNotificationsResponse($procResponse->Outputs[Status], $procResponse->Results);
        }
    }
?>
