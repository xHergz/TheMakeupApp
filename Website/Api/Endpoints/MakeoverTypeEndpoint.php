<?php
    require_once __DIR__. "/../Common/ApiUtilities.php";
    require_once __DIR__. "/../Common/Log.php";
    require_once __DIR__. "/../Data/ApiRequest.php";
    require_once __DIR__. "/../Data/HttpStatus.php";
    require_once __DIR__. "/../DataAccessLayer/ArtistMakeoverOfferedDal.php";
    require_once __DIR__. "/../Helpers/AuthorizationMethods.php";
    require_once 'IApiEndpoint.php';

    class MakeoverTypeEndpoint implements IApiEndpoint {
        public function get() {
            // Only empty request is valid
            $apiRequest = new ApiRequest($_GET, "MakeoverTypes");
            if (!$apiRequest->IsEmpty()) {
                $apiRequest->EndRequest(HttpStatus::NOT_FOUND, "Request is not empty");
            }

            $artistMakeoverOfferedDal = new ArtistMakeoverOfferedDal();
            if (!$artistMakeoverOfferedDal->Initialize()) {
                $apiRequest->EndRequest(HttpStatus::INTERNAL_SERVER_ERROR, 'Database connection could not be initialized');
            }

            $apiRequest->LogRequest();
            $response = $artistMakeoverOfferedDal->GetMakeoverTypes();
            $jsonResponse = $artistMakeoverOfferedDal->EncodeResponse($response);
            Log::LogInformation('MakeoverTypes GET Response: ' . $jsonResponse);
            echo $jsonResponse;
            $artistMakeoverOfferedDal->Close();
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