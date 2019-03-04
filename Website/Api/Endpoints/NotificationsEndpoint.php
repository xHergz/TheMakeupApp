<?php
    require_once __DIR__. "/../Common/ApiUtilities.php";
    require_once __DIR__. "/../Common/Log.php";
    require_once __DIR__. "/../Data/ApiRequest.php";
    require_once __DIR__. "/../Data/HttpStatus.php";
    require_once __DIR__. "/../DataAccessLayer/NotificationsDal.php";
    require_once __DIR__. "/../Helpers/UserMethods.php";
    require_once 'IApiEndpoint.php';

    class NotificationsEndPoint implements IApiEndpoint {
        const DISPLAY_NAME_KEY = 'displayName';

        const LAST_NOTIFICATION_ID_KEY = 'lastNotificationId';

        const RECEIVED_KEY = 'received';

        public function get() {
            // This method supports the following calls:
            // ../notifications?displayName=someName (Gets most recent notifications)
            // ../notifications?displayName=someName&lastNotificationId=X (Gets 'more' notifications from last gotten)
            // ../notifications?displayName=someName&received=false (Gets # of unreceived notifications)
            $apiRequest = new ApiRequest($_GET, 'Notifications');
            if ($apiRequest->IsEmpty()) {
                $apiRequest->EndRequest(HttpStatus::NOT_FOUND, 'Request is empty');
            }
            else if ($apiRequest->IsForUniqueId()) {
                $apiRequest->EndRequest(HttpStatus::NOT_FOUND, 'Request is for unique id');
            }
            else if ($apiRequest->NumberOfParameters() > 2) {
                $apiRequest->EndRequest(HttpStatus::NOT_FOUND, 'Request has more than 2 parameters');
            }

            // Check if session key is authorized to get notifications for user
            if ($apiRequest->IsKeySet(self::DISPLAY_NAME_KEY)) {
                $authorizationStatus = $this->IsSessionAuthorizedForNotifications($apiRequest->GetKey(self::DISPLAY_NAME_KEY));
                if ($authorizationStatus != HttpStatus::OK) {
                    $apiRequest->EndRequest($authorizationStatus, 'Authorization failed');
                }
            }
            else {
                $apiRequest->EndRequest(HttpStatus::NOT_FOUND, 'Display Name not set');
            }

            $notificationsDal = new NotificationsDal();
            if (!$notificationsDal->Initialize()) {
                $apiRequest->EndRequest(HttpStatus::INTERNAL_SERVER_ERROR, 'Database connection could not be initialized');
            }

            $apiRequest->LogRequest();
            $response = null;
            // Check the combinations of parameters
            if ($apiRequest->HasOnlySpecifiedKeys(self::DISPLAY_NAME_KEY)) {
                $displayName = $apiRequest->GetKey(self::DISPLAY_NAME_KEY);
                $response = $notificationsDal->GetUserNotifications($displayName);
            }
            else if ($apiRequest->HasOnlySpecifiedKeys(self::DISPLAY_NAME_KEY, self::LAST_NOTIFICATION_ID_KEY)) {
                $displayName = $apiRequest->GetKey(self::DISPLAY_NAME_KEY);
                $lastNotificationId = $apiRequest->GetKey(self::LAST_NOTIFICATION_ID_KEY);
                $response = $notificationsDal->GetUserNotifications($displayName, $lastNotificationId);
            }
            else if ($apiRequest->HasOnlySpecifiedKeys(self::DISPLAY_NAME_KEY, self::RECEIVED_KEY)) {
                $displayName = $apiRequest->GetKey(self::DISPLAY_NAME_KEY);
                $received = $apiRequest->GetKey(self::RECEIVED_KEY);
                $response = $notificationsDal->GetNumberOfNewUserNotifications($displayName, $received);
            }
            else {
                $notificationsDal->Close();
                $apiRequest->EndRequest(HttpStatus::NOT_FOUND, 'Unknown combination of parameters');
            }

            $jsonResponse = $notificationsDal->EncodeResponse($response);
            Log::LogInformation('Notifications GET Response: ' . $jsonResponse);
            echo $jsonResponse;
            $notificationsDal->Close();
        }

        public function post() {
            // This method supports the following calls:
            // /notifications body: displayName=someName (Acknowledges unreceived notifications for user)
            $apiRequest = new ApiRequest($_POST, 'Notifications');
            if ($apiRequest->IsEmpty()) {
                $apiRequest->EndRequest(HttpStatus::NOT_FOUND, 'Request is empty');
            }
            else if ($apiRequest->IsForUniqueId()) {
                $apiRequest->EndRequest(HttpStatus::NOT_FOUND, 'Request is for unique id');
            }
            else if ($apiRequest->NumberOfParameters() > 1) {
                $apiRequest->EndRequest(HttpStatus::NOT_FOUND, 'Request has more than 1 parameter');
            }

            // Check if session key is authorized to get notifications for user
            if ($apiRequest->IsKeySet(self::DISPLAY_NAME_KEY)) {
                $authorizationStatus = $this->IsSessionAuthorizedForNotifications($apiRequest->GetKey(self::DISPLAY_NAME_KEY));
                if ($authorizationStatus != HttpStatus::OK) {
                    $apiRequest->EndRequest($authorizationStatus, 'Authorization failed');
                }
            }
            else {
                $apiRequest->EndRequest(HttpStatus::NOT_FOUND, 'Display Name not set');
            }

            $notificationsDal = new NotificationsDal();
            if (!$notificationsDal->Initialize()) {
                $apiRequest->EndRequest(HttpStatus::INTERNAL_SERVER_ERROR, 'Database connection could not be initialized');
            }

            $apiRequest->LogRequest();
            $response = null;
            // Check the combinations of parameters
            if ($apiRequest->HasOnlySpecifiedKeys(self::DISPLAY_NAME_KEY)) {
                $displayName = $apiRequest->GetKey(self::DISPLAY_NAME_KEY);
                $response = $notificationsDal->AcknowledgeUserNotifications($displayName);
            }
            else {
                $notificationsDal->Close();
                $apiRequest->EndRequest(HttpStatus::NOT_FOUND, 'Unknown combination of parameters');
            }

            $jsonResponse = $notificationsDal->EncodeResponse($response);
            Log::LogInformation('Notifications GET Response: ' . $jsonResponse);
            echo $jsonResponse;
            $notificationsDal->Close();
        }

        public function put() {
            BadRequest(HttpStatus::METHOD_NOT_ALLOWED);
        }

        public function delete() {
            BadRequest(HttpStatus::METHOD_NOT_ALLOWED);
        }

        public function options() {
            header('Allow: GET, POST, OPTIONS');
        }

        private function IsSessionAuthorizedForNotifications($displayName) {
            Log::LogInformation("Session Authorized for Display Name: " . $displayName);
            $doesSessionOwnUserResponse = AuthorizeSessionForDisplayName(GetBearerToken(), $displayName);
            Log::LogInformation("Session Authorized for Display Name Response: " . $doesSessionOwnUserResponse);
            if ($doesSessionOwnUserResponse != Errors::SUCCESS) {
                switch ($doesSessionOwnUserResponse) {
                    case Errors::USER_DOES_NOT_BELONG_TO_SESSION:
                        return HttpStatus::UNAUTHORIZED;
                    default:
                        return HttpStatus::INTERNAL_SERVER_ERROR;
                }
            }
            return HttpStatus::OK;
        }
    }
?>