<?php
    require_once __DIR__. "/../Common/ApiUtilities.php";
    require_once __DIR__. "/../Common/Log.php";
    require_once __DIR__. "/../Data/ApiRequest.php";
    require_once __DIR__. "/../Data/HttpStatus.php";
    require_once __DIR__. "/../DataAccessLayer/ArtistPortfolioPictureDal.php";
    require_once __DIR__. "/../Helpers/AuthorizationMethods.php";
    require_once 'IApiEndpoint.php';

    class ArtistPortfolioPictureEndpoint implements IApiEndpoint {
        const ARTIST_PORTFOLIO_ID = "artistPortfolioId";

        const DISPLAY_NAME_KEY = "displayName";

        const IMAGE_KEY = "image";

        const MAKEOVER_TYPE_ID_KEY = "makeoverTypeId";

        public function get() {
            $apiRequest = new ApiRequest($_GET, 'ArtistPortfolioPicture');
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

            $artistPortfolioPictureDal = new ArtistPortfolioPictureDal();
            if (!$artistPortfolioPictureDal->Initialize()) {
                $apiRequest->EndRequest(HttpStatus::INTERNAL_SERVER_ERROR, 'Database connection could not be initialized');
            }
            
            $displayName = $apiRequest->GetUniqueId();
            $response = $artistPortfolioPictureDal->GetArtistPortfolioPictures($displayName);
            $jsonResponse = $artistPortfolioPictureDal->EncodeResponse($response);
            Log::LogInformation('ArtistPortfolioPicture GET Response: ' . $jsonResponse);
            echo $jsonResponse;
            $artistPortfolioPictureDal->Close();
        }

        public function post() {
            BadRequest(405);
        }

        public function put() {
            $apiRequest = new ApiRequest(GetPutInput(), 'ArtistPortfolioPicture');
            $apiRequest->LogRequest();

            if (!$apiRequest->HasOnlySpecifiedKeys(self::ARTIST_PORTFOLIO_ID, self::IMAGE_KEY, self::MAKEOVER_TYPE_ID_KEY)){
                $apiRequest->EndRequest(HttpStatus::BAD_REQUEST, "Invalid parameter combination");
            }

            $artistPortfolioId = $apiRequest->GetKey(self::ARTIST_PORTFOLIO_ID);
            $image = $apiRequest->GetKey(self::IMAGE_KEY);
            $makeoverTypeId = $apiRequest->GetKey(self::MAKEOVER_TYPE_ID_KEY);

            $authorizationResponse = AuthorizeSessionForArtistPortfolio(GetBearerToken(), $artistPortfolioId);
            if ($authorizationResponse != Errors::SUCCESS) {
                $apiRequest->EndRequest(HttpStatus::UNAUTHORIZED, Errors::GetErrorMessage($authorizationResponse));
            }

            $artistPortfolioPictureDal = new ArtistPortfolioPictureDal();
            if (!$artistPortfolioPictureDal->Initialize()) {
                $apiRequest->EndRequest(HttpStatus::INTERNAL_SERVER_ERROR, 'Database connection could not be initialized');
            }

            $userId = GetUserIdBySessionKey(GetBearerToken());
            $imageUrl = UploadArtistPortfolioImage($image, $userId);
            if ($imageUrl == null) {
                $apiRequest->EndRequest(HttpStatus::INTERNAL_SERVER_ERROR, 'Failed to upload the artist portfolio picture');
            }
            $response = $artistPortfolioPictureDal->AddArtistPortfolioPicture($artistPortfolioId, $imageUrl, $makeoverTypeId);
            $jsonResponse = $artistPortfolioPictureDal->EncodeResponse($response);
            Log::LogInformation('ArtistPortfolioPicture PUT Response: ' . $jsonResponse);
            echo $jsonResponse;
            $artistPortfolioPictureDal->Close();
        }

        public function delete() {
            $apiRequest = new ApiRequest($_GET, 'ArtistPortfolioPicture');
            $apiRequest->LogRequest();

            if (!$apiRequest->IsForUniqueId()){
                $apiRequest->EndRequest(HttpStatus::BAD_REQUEST, "Request is not for unique id");
            }

            $artistPortfolioPictureId = $apiRequest->GetUniqueId();
            $authorizationResponse = AuthorizeSessionForArtistPortfolioPicture(GetBearerToken(), $artistPortfolioPictureId);
            if ($authorizationResponse != Errors::SUCCESS) {
                $apiRequest->EndRequest(HttpStatus::UNAUTHORIZED, Errors::GetErrorMessage($authorizationResponse));
            }

            $artistPortfolioPictureDal = new ArtistPortfolioPictureDal();
            if (!$artistPortfolioPictureDal->Initialize()) {
                $apiRequest->EndRequest(HttpStatus::INTERNAL_SERVER_ERROR, 'Database connection could not be initialized');
            }

            $response = $artistPortfolioPictureDal->DeleteArtistPortfolioPicture($artistPortfolioPictureId);
            $jsonResponse = $artistPortfolioPictureDal->EncodeResponse($response);
            Log::LogInformation('ArtistPortfolioPicture DELETE Response: ' . $jsonResponse);
            echo $jsonResponse;
            $artistPortfolioPictureDal->Close();
        }

        public function options() {
            header('Allow: GET, PUT, DELETE, OPTIONS');
        }
    }
?>