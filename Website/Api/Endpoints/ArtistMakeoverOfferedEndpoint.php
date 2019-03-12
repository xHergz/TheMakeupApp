<?php
    require_once __DIR__. "/../Common/ApiUtilities.php";
    require_once __DIR__. "/../Common/Log.php";
    require_once __DIR__. "/../Data/ApiRequest.php";
    require_once __DIR__. "/../Data/HttpStatus.php";
    require_once __DIR__. "/../DataAccessLayer/ArtistMakeoverOfferedDal.php";
    require_once __DIR__. "/../Helpers/AuthorizationMethods.php";
    require_once 'IApiEndpoint.php';

    class ArtistMakeoverOfferedEndpoint implements IApiEndpoint {
        const ARTIST_PORTFOLIO_ID = "artistPortfolioId";

        const MAKEOVER_TYPE_ID = "makeoverTypeId";

        const DISPLAY_NAME_KEY = "displayName";

        public function get() {
            $apiRequest = new ApiRequest($_GET, 'ArtistMakeoverOffered');
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

            $artistMakeoverOfferedDal = new ArtistMakeoverOfferedDal();
            if (!$artistMakeoverOfferedDal->Initialize()) {
                $apiRequest->EndRequest(HttpStatus::INTERNAL_SERVER_ERROR, 'Database connection could not be initialized');
            }
            
            $displayName = $apiRequest->GetUniqueId();
            $response = $artistMakeoverOfferedDal->GetArtistMakeoversOffered($displayName);
            $jsonResponse = $artistMakeoverOfferedDal->EncodeResponse($response);
            Log::LogInformation('ArtistMakeoverOffered GET Response: ' . $jsonResponse);
            echo $jsonResponse;
            $artistMakeoverOfferedDal->Close();
        }

        public function post() {
            BadRequest(405);
        }

        public function put() {
            $apiRequest = new ApiRequest(GetPutInput(), 'ArtistMakeoverOffered');
            $apiRequest->LogRequest();

            if (!$apiRequest->HasOnlySpecifiedKeys(self::ARTIST_PORTFOLIO_ID, self::MAKEOVER_TYPE_ID)){
                $apiRequest->EndRequest(HttpStatus::BAD_REQUEST, "Invalid parameter combination");
            }

            $artistPortfolioId = $apiRequest->GetKey(self::ARTIST_PORTFOLIO_ID);
            $makeoverTypeId = $apiRequest->GetKey(self::MAKEOVER_TYPE_ID);

            $authorizationResponse = AuthorizeSessionForArtistPortfolio(GetBearerToken(), $artistPortfolioId);
            if ($authorizationResponse != Errors::SUCCESS) {
                $apiRequest->EndRequest(HttpStatus::UNAUTHORIZED, Errors::GetErrorMessage($authorizationResponse));
            }

            $artistMakeoverOfferedDal = new ArtistMakeoverOfferedDal();
            if (!$artistMakeoverOfferedDal->Initialize()) {
                $apiRequest->EndRequest(HttpStatus::INTERNAL_SERVER_ERROR, 'Database connection could not be initialized');
            }

            $response = $artistMakeoverOfferedDal->AddArtistMakeoverOffered($artistPortfolioId, $makeoverTypeId);
            $jsonResponse = $artistMakeoverOfferedDal->EncodeResponse($response);
            Log::LogInformation('ArtistMakeoverOffered PUT Response: ' . $jsonResponse);
            echo $jsonResponse;
            $artistMakeoverOfferedDal->Close();
        }

        public function delete() {
            $apiRequest = new ApiRequest($_GET, 'ArtistMakeoverOffered');
            $apiRequest->LogRequest();

            if (!$apiRequest->IsForUniqueId()){
                $apiRequest->EndRequest(HttpStatus::BAD_REQUEST, "Request is not for unique id");
            }

            $artistMakeoverOfferedId = $apiRequest->GetUniqueId();
            $authorizationResponse = AuthorizeSessionForArtistMakeoverOffered(GetBearerToken(), $artistMakeoverOfferedId);
            if ($authorizationResponse != Errors::SUCCESS) {
                $apiRequest->EndRequest(HttpStatus::UNAUTHORIZED, Errors::GetErrorMessage($authorizationResponse));
            }

            $artistMakeoverOfferedDal = new ArtistMakeoverOfferedDal();
            if (!$artistMakeoverOfferedDal->Initialize()) {
                $apiRequest->EndRequest(HttpStatus::INTERNAL_SERVER_ERROR, 'Database connection could not be initialized');
            }

            $response = $artistMakeoverOfferedDal->DeleteArtistMakeoverOffered($artistMakeoverOfferedId);
            $jsonResponse = $artistMakeoverOfferedDal->EncodeResponse($response);
            Log::LogInformation('ArtistMakeoverOffered DELETE Response: ' . $jsonResponse);
            echo $jsonResponse;
            $artistMakeoverOfferedDal->Close();
        }

        public function options() {
            header('Allow: GET, PUT, DELETE, OPTIONS');
        }
    }
?>