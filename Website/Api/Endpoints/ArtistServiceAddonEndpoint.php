<?php
    require_once __DIR__. "/../Common/ApiUtilities.php";
    require_once __DIR__. "/../Common/Log.php";
    require_once __DIR__. "/../Data/ApiRequest.php";
    require_once __DIR__. "/../Data/HttpStatus.php";
    require_once __DIR__. "/../DataAccessLayer/ArtistServiceAddonDal.php";
    require_once __DIR__. "/../Helpers/AuthorizationMethods.php";
    require_once 'IApiEndpoint.php';

    class ArtistServiceAddonEndpoint implements IApiEndpoint {
        const ARTIST_SERVICE_ID_KEY = "artistServiceId";

        const DESCRIPTION_KEY = "description";

        const DISPLAY_NAME_KEY = "displayName";

        const PRICE_KEY = "price";

        public function get() {
            $apiRequest = new ApiRequest($_GET, 'ArtistServiceAddon');
            $apiRequest->LogRequest();
            // This method only supports being called by unique id: ../artist-service-addon/displayName=""
            if (!$apiRequest->IsForUniqueId()) {
                $apiRequest->EndRequest(HttpStatus::NOT_FOUND, 'Request is not for unique id');
            }

            $authorizationResponse = AuthorizeSession(GetBearerToken());
            if ($authorizationResponse != Errors::SUCCESS) {
                $apiRequest->EndRequest(HttpStatus::UNAUTHORIZED, Errors::GetErrorMessage($authorizationResponse));
            }

            $artistServiceAddonDal = new ArtistServiceAddonDal();
            if (!$artistServiceAddonDal->Initialize()) {
                $apiRequest->EndRequest(HttpStatus::INTERNAL_SERVER_ERROR, 'Database connection could not be initialized');
            }
            
            $displayName = $apiRequest->GetUniqueId();
            $response = $artistServiceAddonDal->GetArtistServiceAddons($displayName);
            $jsonResponse = $artistServiceAddonDal->EncodeResponse($response);
            Log::LogInformation('ArtistServiceAddon GET Response: ' . $jsonResponse);
            echo $jsonResponse;
            $artistServiceAddonDal->Close();
        }

        public function post() {
            BadRequest(405);
        }

        public function put() {
            $apiRequest = new ApiRequest(GetPutInput(), 'ArtistServiceAddon');
            $apiRequest->LogRequest();

            if (!$apiRequest->HasOnlySpecifiedKeys(self::ARTIST_SERVICE_ID_KEY, self::DESCRIPTION_KEY, self::PRICE_KEY)){
                $apiRequest->EndRequest(HttpStatus::BAD_REQUEST, "Invalid parameter combination");
            }

            $artistServiceId = $apiRequest->GetKey(self::ARTIST_SERVICE_ID_KEY);
            $description = $apiRequest->GetKey(self::DESCRIPTION_KEY);
            $price = $apiRequest->GetKey(self::PRICE_KEY);

            $authorizationResponse = AuthorizeSessionForArtistService(GetBearerToken(), $artistServiceId);
            if ($authorizationResponse != Errors::SUCCESS) {
                $apiRequest->EndRequest(HttpStatus::UNAUTHORIZED, Errors::GetErrorMessage($authorizationResponse));
            }

            $artistServiceAddonDal = new ArtistServiceAddonDal();
            if (!$artistServiceAddonDal->Initialize()) {
                $apiRequest->EndRequest(HttpStatus::INTERNAL_SERVER_ERROR, 'Database connection could not be initialized');
            }

            $response = $artistServiceAddonDal->AddArtistServiceAddon($artistServiceId, $description, $price);
            $jsonResponse = $artistServiceAddonDal->EncodeResponse($response);
            Log::LogInformation('ArtistServiceAddon PUT Response: ' . $jsonResponse);
            echo $jsonResponse;
            $artistServiceAddonDal->Close();
        }

        public function delete() {
            $apiRequest = new ApiRequest($_GET, 'ArtistServiceAddon');
            $apiRequest->LogRequest();

            if (!$apiRequest->IsForUniqueId()){
                $apiRequest->EndRequest(HttpStatus::BAD_REQUEST, "Request is not for unique id");
            }

            $artistServiceAddonId = $apiRequest->GetUniqueId();
            $authorizationResponse = AuthorizeSessionForArtistServiceAddon(GetBearerToken(), $artistServiceAddonId);
            if ($authorizationResponse != Errors::SUCCESS) {
                $apiRequest->EndRequest(HttpStatus::UNAUTHORIZED, Errors::GetErrorMessage($authorizationResponse));
            }

            $artistServiceAddonDal = new ArtistServiceAddonDal();
            if (!$artistServiceAddonDal->Initialize()) {
                $apiRequest->EndRequest(HttpStatus::INTERNAL_SERVER_ERROR, 'Database connection could not be initialized');
            }

            $response = $artistServiceAddonDal->DeleteArtistServiceAddon($artistServiceAddonId);
            $jsonResponse = $artistServiceAddonDal->EncodeResponse($response);
            Log::LogInformation('ArtistServiceAddon DELETE Response: ' . $jsonResponse);
            echo $jsonResponse;
            $artistServiceAddonDal->Close();
        }

        public function options() {
            header('Allow: GET, PUT, DELETE, OPTIONS');
        }
    }
?>