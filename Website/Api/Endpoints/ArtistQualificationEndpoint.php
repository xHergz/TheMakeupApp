<?php
    require_once __DIR__. "/../Common/ApiUtilities.php";
    require_once __DIR__. "/../Common/Log.php";
    require_once __DIR__. "/../Data/ApiRequest.php";
    require_once __DIR__. "/../Data/HttpStatus.php";
    require_once __DIR__. "/../DataAccessLayer/ArtistQualificationDal.php";
    require_once __DIR__. "/../Helpers/AuthorizationMethods.php";
    require_once 'IApiEndpoint.php';

    class ArtistQualificationEndpoint implements IApiEndpoint {
        const ARTIST_PORTFOLIO_ID = "artistPortfolioId";

        const DESCRIPTION_KEY = "description";

        const DISPLAY_NAME_KEY = "displayName";

        const YEAR_OBTAINED_KEY = "yearObtained";

        public function get() {
            $apiRequest = new ApiRequest($_GET, 'ArtistQualification');
            $apiRequest->LogRequest();
            // This method only supports being called by unique id: ../artist-qualification/displayName=""
            if (!$apiRequest->IsForUniqueId()) {
                $apiRequest->EndRequest(HttpStatus::NOT_FOUND, 'Request is not for unique id');
            }

            // Check if session key is valid to get client profile information
            $authorizationResponse = AuthorizeSession(GetBearerToken());
            if ($authorizationResponse != Errors::SUCCESS) {
                $apiRequest->EndRequest(HttpStatus::UNAUTHORIZED, Errors::GetErrorMessage($authorizationResponse));
            }

            $artistQualificationDal = new ArtistQualificationDal();
            if (!$artistQualificationDal->Initialize()) {
                $apiRequest->EndRequest(HttpStatus::INTERNAL_SERVER_ERROR, 'Database connection could not be initialized');
            }
            
            $displayName = $apiRequest->GetUniqueId();
            $response = $artistQualificationDal->GetArtistQualifications($displayName);
            $jsonResponse = $artistQualificationDal->EncodeResponse($response);
            Log::LogInformation('ArtistQualification GET Response: ' . $jsonResponse);
            echo $jsonResponse;
            $artistQualificationDal->Close();
        }

        public function post() {
            BadRequest(405);
        }

        public function put() {
            $apiRequest = new ApiRequest(GetPutInput(), 'ArtistQualification');
            $apiRequest->LogRequest();

            if (!$apiRequest->HasOnlySpecifiedKeys(self::ARTIST_PORTFOLIO_ID, self::YEAR_OBTAINED_KEY, self::DESCRIPTION_KEY)){
                $apiRequest->EndRequest(HttpStatus::BAD_REQUEST, "Invalid parameter combination");
            }

            $artistPortfolioId = $apiRequest->GetKey(self::ARTIST_PORTFOLIO_ID);
            $yearObtained = $apiRequest->GetKey(self::YEAR_OBTAINED_KEY);
            $description = $apiRequest->GetKey(self::DESCRIPTION_KEY);

            $authorizationResponse = AuthorizeSessionForArtistPortfolio(GetBearerToken(), $artistPortfolioId);
            if ($authorizationResponse != Errors::SUCCESS) {
                $apiRequest->EndRequest(HttpStatus::UNAUTHORIZED, Errors::GetErrorMessage($authorizationResponse));
            }

            $artistQualificationDal = new ArtistQualificationDal();
            if (!$artistQualificationDal->Initialize()) {
                $apiRequest->EndRequest(HttpStatus::INTERNAL_SERVER_ERROR, 'Database connection could not be initialized');
            }

            $response = $artistQualificationDal->AddArtistQualification($artistPortfolioId, $yearObtained, $description);
            $jsonResponse = $artistQualificationDal->EncodeResponse($response);
            Log::LogInformation('ArtistQualification PUT Response: ' . $jsonResponse);
            echo $jsonResponse;
            $artistQualificationDal->Close();
        }

        public function delete() {
            $apiRequest = new ApiRequest($_GET, 'ArtistQualification');
            $apiRequest->LogRequest();

            if (!$apiRequest->IsForUniqueId()){
                $apiRequest->EndRequest(HttpStatus::BAD_REQUEST, "Request is not for unique id");
            }

            $artistQualificationId = $apiRequest->GetUniqueId();
            $authorizationResponse = AuthorizeSessionForArtistQualification(GetBearerToken(), $artistQualificationId);
            if ($authorizationResponse != Errors::SUCCESS) {
                $apiRequest->EndRequest(HttpStatus::UNAUTHORIZED, Errors::GetErrorMessage($authorizationResponse));
            }

            $artistQualificationDal = new ArtistQualificationDal();
            if (!$artistQualificationDal->Initialize()) {
                $apiRequest->EndRequest(HttpStatus::INTERNAL_SERVER_ERROR, 'Database connection could not be initialized');
            }

            $response = $artistQualificationDal->DeleteArtistQualification($artistQualificationId);
            $jsonResponse = $artistQualificationDal->EncodeResponse($response);
            Log::LogInformation('ArtistQualification DELETE Response: ' . $jsonResponse);
            echo $jsonResponse;
            $artistQualificationDal->Close();
        }

        public function options() {
            header('Allow: GET, PUT, DELETE, OPTIONS');
        }
    }
?>