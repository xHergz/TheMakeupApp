<?php
    require_once __DIR__. "/../Common/ApiUtilities.php";  
    require_once __DIR__. "/../DataAccessLayer/UserDal.php";  
    require_once 'IApiEndpoint.php';

    class SessionEndPoint implements IApiEndpoint {
        public function get() {
            if (GetRequestIsEmpty() || !GetRequestIsForUniqueId()) {
                BadRequest(404);
            }

            $requesterSessionKey = GetBearerToken();
            $queriedSessionKey = GetUniqueId();
            $userDal = new UserDal();
            if (!$userDal->Initialize()) {
                BadRequest(500);
            }
            $response = $userDal->GetSessionInfo($requesterSessionKey, $queriedSessionKey);
            echo $userDal->EncodeResponse($response);
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
    }
?>