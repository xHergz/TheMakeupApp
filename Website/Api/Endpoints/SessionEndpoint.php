<?php
    require_once __DIR__. "/../Common/ApiUtilities.php";
    require_once __DIR__. "/../Common/Log.php";
    require_once __DIR__. "/../Data/ApiRequest.php";
    require_once __DIR__. "/../Data/HttpStatus.php";
    require_once __DIR__. "/../DataAccessLayer/UserDal.php";
    require_once 'IApiEndpoint.php';

    class SessionEndPoint implements IApiEndpoint {
        public function get() {
            $apiRequest = new ApiRequest($_GET, 'Session');
            // This method only supports being called by unique id
            if ($apiRequest->IsEmpty()) {
                $apiRequest->EndRequest(HttpStatus::NOT_FOUND, 'Request is empty');
            }
            if (!$apiRequest->IsForUniqueId()) {
                $apiRequest->EndRequest(HttpStatus::NOT_FOUND, 'Request is not for unique id');
            }

            $userDal = new UserDal();
            if (!$userDal->Initialize()) {
                $apiRequest->EndRequest(HttpStatus::INTERNAL_SERVER_ERROR, 'Database connection could not be initialized');
            }
            
            $requesterSessionKey = GetBearerToken();
            $queriedSessionKey = GetUniqueId();
            $apiRequest->LogRequest();

            // Check if requester session is authorized to access queried session
            if (!$userDal->IsSessionAuthorizedForSession($requesterSessionKey, $queriedSessionKey)) {
                $apiRequest->EndRequest(HttpStatus::UNAUTHORIZED, 'Requester session key is not authorized for queried session key');
            }
            
            $response = $userDal->GetSessionInfo($queriedSessionKey);
            $jsonResponse = $userDal->EncodeResponse($response);
            Log::LogInformation('Session GET Response: ' . $jsonResponse);
            echo $jsonResponse;
            $userDal->Close();
        }

        public function post() {
            BadRequest(405);
        }

        public function put() {
            BadRequest(405);
        }

        public function delete() {
            BadRequest(405);
        }

        public function options() {
            header('Allow: GET, OPTIONS');
        }
    }
?>