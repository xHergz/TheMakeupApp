<?php
    require_once __DIR__. "/../Common/ApiUtilities.php";
    require_once __DIR__. "/../Common/Log.php";
    require_once __DIR__. "/../DataAccessLayer/UserDal.php";
    require_once 'IApiEndpoint.php';

    class SessionEndPoint implements IApiEndpoint {
        public function get() {
            // This method only supports being called by unique id
            if (GetRequestIsEmpty()) {
                Log::LogError('(404) Session GET Request failed because GET request is empty.');
                BadRequest(404);
            }
            if (!GetRequestIsForUniqueId()) {
                Log::LogError('(404) Session GET Request failed because it\'s not being called by Unique ID.');
                BadRequest(404);
            }

            $userDal = new UserDal();
            if (!$userDal->Initialize()) {
                Log::LogError('(404) Session GET Request failed because the database connection could not be initialized.');
                BadRequest(500);
            }
            $requesterSessionKey = GetBearerToken();
            $queriedSessionKey = GetUniqueId();
            Log::LogInformation('Session GET Request with Requester Session Key \'' . $requesterSessionKey . 
                '\' and Queried Session Key \'' . $queriedSessionKey . '\'.');
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