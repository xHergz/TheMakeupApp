<?php
    require_once __DIR__. "/../Common/ApiUtilities.php";
    require_once __DIR__. "/../Common/Log.php";
    require_once __DIR__. "/../Data/HttpStatus.php";
    require_once __DIR__. "/../DataAccessLayer/NotificationsDal.php";
    require_once __DIR__. "/../Helpers/UserMethods.php";
    require_once 'IApiEndpoint.php';

    class NotificationsEndPoint implements IApiEndpoint {
        public function get() {
            // This method supports the following calls:
            // ../notifications?displayName=someName (Gets most recent notifications)
            // ../notifications?displayName=someName&lastNotificationId=X (Gets 'more' notifications from last gotten)
            // ../notifications?displayName=someName&received=false (Gets # of unreceived notifications)
            if (GetRequestIsEmpty()) {
                Log::LogError('(404) Notifications GET Request failed because GET request is empty.');
                BadRequest(HttpStatus::NOT_FOUND);
            }

            if (GetRequestIsForUniqueId()) {
                Log::LogError('(404) Notifications GET Request failed because GET request is for a unique id.');
                BadRequest(HttpStatus::NOT_FOUND);
            }

            if (GetNumberOfGetParams() > 3) {
                Log::LogError('(404) Notifications GET Request failed because GET request has more than 2 params.');
                BadRequest(HttpStatus::NOT_FOUND);
            }

            // Check if session key is authorized to get notifications for user
            if (isset($_GET['displayName'])) {
                $this->IsSessionAuthorizedForNotifications($_GET['displayName']);
            }

            if (isset($_GET['displayName']) && GetNumberOfGetParams() == 2) {
                $this->GetMostRecentNotifications($_GET['displayName']);
            }
            else if (isset($_GET['displayName']) && isset($_GET['lastNotificationId']) && GetNumberOfGetParams() == 3) {
                $this->GetMoreNotifications($_GET['displayName'], $_GET['lastNotificationId']);
            }
            else if (isset($_GET['displayName']) && isset($_GET['received']) && GetNumberOfGetParams() == 3) {
                $this->GetNumberOfNewNotifications($_GET['displayName'], $_GET['received']);
            }
            else {
                Log::LogError('(404) Notifications GET Request failed because GET Request has an unknown combination of params.');
                BadRequest(HttpStatus::NOT_FOUND);
            }
        }

        public function post() {
            // This method supports the following calls:
            // /notifications body: displayName=someName (Acknowledges unreceived notifications for user)
            BadRequest(HttpStatus::METHOD_NOT_ALLOWED);
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
            $doesSessionOwnUserResponse = AuthorizeSessionForUser(GetBearerToken(), $displayName);
            if ($doesSessionOwnUserResponse != Errors::SUCCESS) {
                switch ($doesSessionOwnUserResponse) {
                    case Errors::USER_DOES_NOT_BELONG_TO_SESSION:
                        $httpStatus = HttpStatus::UNAUTHORIZED;
                        break;
                    default:
                        $httpStatus = HttpStatus::INTERNAL_SERVER_ERROR;
                }
                Log::LogError('(' . $httpStatus . ') Notifications API Request Failed Authorization');
                BadRequest($httpStatus);
            }
        }

        private function GetMostRecentNotifications($displayName) {
            $notificationsDal = new NotificationsDal();
            if (!$notificationsDal->Initialize()) {
                Log::LogError('(500) Notifications GET Request failed because the database connection could not be initialized.');
                BadRequest(HttpStatus::INTERNAL_SERVER_ERROR);
            }
            Log::LogInformation('Notifications GET Request with Display Name \'' . $displayName . '\'.');
            $response = $notificationsDal->GetUserNotifications($displayName);
            $jsonResponse = $notificationsDal->EncodeResponse($response);
            Log::LogInformation('Notifications GET Response: ' . $jsonResponse);
            echo $jsonResponse;
            $notificationsDal->Close();
        }

        private function GetMoreNotifications($displayName, $lastNotificationId) {
            $notificationsDal = new NotificationsDal();
            if (!$notificationsDal->Initialize()) {
                Log::LogError('(500) Notifications GET Request failed because the database connection could not be initialized.');
                BadRequest(HttpStatus::INTERNAL_SERVER_ERROR);
            }
            Log::LogInformation('Notifications GET Request with Display Name \'' . $displayName . '\' and Last Notification Id \''
                . $lastNotificationId .'\'.');
            $response = $notificationsDal->GetUserNotifications($displayName, $lastNotificationId);
            $jsonResponse = $notificationsDal->EncodeResponse($response);
            Log::LogInformation('Notifications GET Response: ' . $jsonResponse);
            echo $jsonResponse;
            $notificationsDal->Close();
        }

        private function GetNumberOfNewNotifications($displayName, $received) {
            $notificationsDal = new NotificationsDal();
            if (!$notificationsDal->Initialize()) {
                Log::LogError('(500) Notifications GET Request failed because the database connection could not be initialized.');
                BadRequest(HttpStatus::INTERNAL_SERVER_ERROR);
            }
            Log::LogInformation('Notifications GET Request with Display Name \'' . $displayName . '\' and Received \''
                . $received .'\'.');
            $response = $notificationsDal->GetNumberOfNewUserNotifications($displayName, $received);
            $jsonResponse = $notificationsDal->EncodeResponse($response);
            Log::LogInformation('Notifications GET Response: ' . $jsonResponse);
            echo $jsonResponse;
            $notificationsDal->Close();
        }
    }
?>