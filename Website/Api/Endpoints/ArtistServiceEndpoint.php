<?php
    require_once __DIR__. "/../Common/ApiUtilities.php";
    require_once __DIR__. "/../Common/Log.php";
    require_once __DIR__. "/../Data/ApiRequest.php";
    require_once __DIR__. "/../Data/HttpStatus.php";
    require_once __DIR__. "/../DataAccessLayer/ArtistServiceDal.php";
    require_once __DIR__. "/../Helpers/AuthorizationMethods.php";
    require_once 'IApiEndpoint.php';

    class ArtistServiceEndpoint implements IApiEndpoint {
        const ARTIST_MAKEOVER_OFFERED_ID_KEY = "artistMakeoverOfferedId";

        const ARTIST_SERVICE_ID_KEY = "artistServiceId";

        const DISPLAY_NAME_KEY = "displayName";

        const PRICE_KEY = "price";

        const SERVICE_TYPE_ID_KEY = "serviceTypeId";

        public function get() {
            $apiRequest = new ApiRequest($_GET, 'ArtistService');
            $apiRequest->LogRequest();
            // This method only supports being called by unique id: ../artist-portfolio-picture/displayName=""
            if (!$apiRequest->IsForUniqueId()) {
                $apiRequest->EndRequest(HttpStatus::NOT_FOUND, 'Request is not for unique id');
            }

            // Check if session key is valid to get client profile information
            $authorizationResponse = AuthorizeSession(GetBearerToken());
            if ($authorizationResponse != Errors::SUCCESS) {
                $apiRequest->EndRequest(HttpStatus::UNAUTHORIZED, Errors::GetErrorMessage($authorizationResponse));
            }

            $artistServiceDal = new ArtistServiceDal();
            if (!$artistServiceDal->Initialize()) {
                $apiRequest->EndRequest(HttpStatus::INTERNAL_SERVER_ERROR, 'Database connection could not be initialized');
            }
            
            $displayName = $apiRequest->GetUniqueId();
            $response = $artistServiceDal->GetArtistServices($displayName);
            $jsonResponse = $artistServiceDal->EncodeResponse($response);
            Log::LogInformation('ArtistService GET Response: ' . $jsonResponse);
            echo $jsonResponse;
            $artistServiceDal->Close();
        }

        public function post() {
            BadRequest(405);
        }

        public function put() {
            $apiRequest = new ApiRequest(GetPutInput(), 'ArtistService');
            $apiRequest->LogRequest();

            if (!$apiRequest->HasOnlySpecifiedKeys(self::ARTIST_MAKEOVER_OFFERED_ID_KEY, self::SERVICE_TYPE_ID_KEY, self::PRICE_KEY)){
                $apiRequest->EndRequest(HttpStatus::BAD_REQUEST, "Invalid parameter combination");
            }

            $artistMakeoverOfferedId = $apiRequest->GetKey(self::ARTIST_MAKEOVER_OFFERED_ID_KEY);
            $serviceTypeId = $apiRequest->GetKey(self::SERVICE_TYPE_ID_KEY);
            $price = $apiRequest->GetKey(self::PRICE_KEY);

            $authorizationResponse = AuthorizeSessionForArtistMakeoverOffered(GetBearerToken(), $artistMakeoverOfferedId);
            if ($authorizationResponse != Errors::SUCCESS) {
                $apiRequest->EndRequest(HttpStatus::UNAUTHORIZED, Errors::GetErrorMessage($authorizationResponse));
            }

            $artistServiceDal = new ArtistServiceDal();
            if (!$artistServiceDal->Initialize()) {
                $apiRequest->EndRequest(HttpStatus::INTERNAL_SERVER_ERROR, 'Database connection could not be initialized');
            }

            $response = $artistServiceDal->AddArtistService($artistMakeoverOfferedId, $serviceTypeId, $price);
            $jsonResponse = $artistServiceDal->EncodeResponse($response);
            Log::LogInformation('ArtistService PUT Response: ' . $jsonResponse);
            echo $jsonResponse;
            $artistServiceDal->Close();
        }

        public function delete() {
            $apiRequest = new ApiRequest($_GET, 'ArtistService');
            $apiRequest->LogRequest();

            if (!$apiRequest->IsForUniqueId()){
                $apiRequest->EndRequest(HttpStatus::BAD_REQUEST, "Request is not for unique id");
            }

            $artistServiceId = $apiRequest->GetUniqueId();
            $authorizationResponse = AuthorizeSessionForArtistService(GetBearerToken(), $artistServiceId);
            if ($authorizationResponse != Errors::SUCCESS) {
                $apiRequest->EndRequest(HttpStatus::UNAUTHORIZED, Errors::GetErrorMessage($authorizationResponse));
            }

            $artistServiceDal = new ArtistServiceDal();
            if (!$artistServiceDal->Initialize()) {
                $apiRequest->EndRequest(HttpStatus::INTERNAL_SERVER_ERROR, 'Database connection could not be initialized');
            }

            $response = $artistServiceDal->DeleteArtistService($artistServiceId);
            $jsonResponse = $artistServiceDal->EncodeResponse($response);
            Log::LogInformation('ArtistService DELETE Response: ' . $jsonResponse);
            echo $jsonResponse;
            $artistServiceDal->Close();
        }

        public function options() {
            header('Allow: GET, PUT, DELETE, OPTIONS');
        }
    }
?>