<?php
    require_once __DIR__. "/../Common/ApiUtilities.php";
    require_once __DIR__. "/../Common/Log.php";
    require_once __DIR__. "/../Common/Validation.php";
    require_once __DIR__. "/../Data/ApiRequest.php";
    require_once __DIR__. "/../Data/HttpStatus.php";
    require_once __DIR__. "/../DataAccessLayer/ArtistPortfolioDal.php";
    require_once __DIR__. "/../Helpers/AuthorizationMethods.php";
    require_once 'IApiEndpoint.php';

    class ArtistPortfolioEndpoint implements IApiEndpoint {
        const BIOGRAPHY_KEY = "biography";

        const DISPLAY_NAME_KEY = "displayName";

        const PROFILE_PICTURE_KEY = "portfolioPicture";

        const USER_ID_KEY = "userId";

        public function get() {
            $apiRequest = new ApiRequest($_GET, 'ArtistPortfolio');
            $apiRequest->LogRequest();
            // This method only supports being called by unique id: ../artist-portfolio/displayName=""
            // or being empty: ../artist-portfolio
            if (!$apiRequest->IsForUniqueId() && !$apiRequest->IsEmpty()) {
                $apiRequest->EndRequest(HttpStatus::NOT_FOUND, 'Request is not for unique id or empty');
            }

            $authorizationResponse = AuthorizeSession(GetBearerToken());
            if ($authorizationResponse != Errors::SUCCESS) {
                $apiRequest->EndRequest(HttpStatus::UNAUTHORIZED, Errors::GetErrorMessage($authorizationResponse));
            }

            $artistPortfolioDal = new ArtistPortfolioDal();
            if (!$artistPortfolioDal->Initialize()) {
                $apiRequest->EndRequest(HttpStatus::INTERNAL_SERVER_ERROR, 'Database connection could not be initialized');
            }
            
            if ($apiRequest->IsForUniqueId()) {
                $displayName = $apiRequest->GetUniqueId();
                $response = $artistPortfolioDal->GetArtistPortfolio($displayName);
            }
            else {
                $response = $artistPortfolioDal->GetArtistPortfolios();
            }

            $jsonResponse = $artistPortfolioDal->EncodeResponse($response);
            Log::LogInformation('ArtistPortfolio GET Response: ' . $jsonResponse);
            echo $jsonResponse;
            $artistPortfolioDal->Close();
        }

        public function post() {
            $apiRequest = new ApiRequest($_POST, 'ArtistPortfolio');
            $apiRequest->LogRequest();
            
            // This method only accepts calls for unique ids
            if (!$apiRequest->IsForUniqueId()) {
                $apiRequest->EndRequest(HttpStatus::NOT_FOUND, "Request is not for unique id");
            }

            // Make sure all the fields are set
            if (!$apiRequest->HasOnlySpecifiedKeys(self::PROFILE_PICTURE_KEY, self::BIOGRAPHY_KEY)){
                $apiRequest->EndRequest(HttpStatus::BAD_REQUEST, "Invalid parameter combination");
            }

            $artistPortfolioId = $apiRequest->GetUniqueId();
            $profilePicture = $apiRequest->GetKey(self::PROFILE_PICTURE_KEY);
            $biography = $apiRequest->GetKey(self::BIOGRAPHY_KEY);
            // Check if session key is valid and owns the user id its updating the profile of
            $authorizationResponse = AuthorizeSessionForArtistPortfolio(GetBearerToken(), $artistPortfolioId);
            if ($authorizationResponse != Errors::SUCCESS) {
                $apiRequest->EndRequest(HttpStatus::UNAUTHORIZED, Errors::GetErrorMessage($authorizationResponse));
            }

            $artistPortfolioDal = new ArtistPortfolioDal();
            if (!$artistPortfolioDal->Initialize()) {
                $apiRequest->EndRequest(HttpStatus::INTERNAL_SERVER_ERROR, 'Database connection could not be initialized');
            }

            // Validate artist portfolio information
            if ($biography == "") {
                $biography = null;
            }
            else if (!Validation::ValidateBiography($biography)) {
                $apiRequest->EndRequest(HttpStatus::BAD_REQUEST, 'Invalid Biography');
            }
            $profilePictureUrl = null;
            $userId = GetUserIdBySessionKey(GetBearerToken());
            if ($profilePicture != '' && $profilePicture != null) {
                // Upload the profile picture
                $profilePictureUrl = UploadArtistPortfolioImage($apiRequest->GetKey(self::PROFILE_PICTURE_KEY), $userId);
            }
            $response = $artistPortfolioDal->UpdateArtistPortfolio($artistPortfolioId, $profilePictureUrl, $biography);
            $jsonResponse = $artistPortfolioDal->EncodeResponse($response);
            Log::LogInformation('ArtistPortfolio POST Response: ' . $jsonResponse);
            echo $jsonResponse;
            $artistPortfolioDal->Close();
        }

        public function put() {
            $apiRequest = new ApiRequest(GetPutInput(), 'ArtistPortfolio');
            $apiRequest->LogRequest();

            // Make sure all the fields are set
            if (!$apiRequest->HasOnlySpecifiedKeys(self::USER_ID_KEY, self::PROFILE_PICTURE_KEY, self::BIOGRAPHY_KEY)){
                $apiRequest->EndRequest(HttpStatus::BAD_REQUEST, "Invalid parameter combination");
            }

            $userId = $apiRequest->GetKey(self::USER_ID_KEY);
            $biography = $apiRequest->GetKey(self::BIOGRAPHY_KEY);

            // Check if session key is valid and owns the user id its creating a profile for
            $authorizationResponse = AuthorizeSessionForUser(GetBearerToken(), $userId);
            if ($authorizationResponse != Errors::SUCCESS) {
                $apiRequest->EndRequest(HttpStatus::UNAUTHORIZED, Errors::GetErrorMessage($authorizationResponse));
            }

            $artistPortfolioDal = new ArtistPortfolioDal();
            if (!$artistPortfolioDal->Initialize()) {
                $apiRequest->EndRequest(HttpStatus::INTERNAL_SERVER_ERROR, 'Database connection could not be initialized');
            }

            // Validate artist portfolio information
            if (!Validation::ValidateBiography($biography)) {
                $apiRequest->EndRequest(HttpStatus::BAD_REQUEST, 'Invalid Biography');
            }
            // Upload the profile picture
            $profilePictureData = $apiRequest->GetKey(self::PROFILE_PICTURE_KEY);
            if ($profilePictureData == null || $profilePictureData == '') {
                $profilePictureUrl = '/images/defaultProfilePic.png';
            }
            else {
                $profilePictureUrl = UploadClientProfileImage($profilePictureData, $userId);
            }
            if ($profilePictureUrl == null) {
                $apiRequest->EndRequest(HttpStatus::INTERNAL_SERVER_ERROR, 'Failed to upload the artist portfolio picture');
            }
            $response = $artistPortfolioDal->CreateArtistPortfolio($userId, $profilePictureUrl, $biography);
            $jsonResponse = $artistPortfolioDal->EncodeResponse($response);
            Log::LogInformation('ArtistPortfolio PUT Response: ' . $jsonResponse);
            echo $jsonResponse;
            $artistPortfolioDal->Close();
        }

        public function delete() {
            BadRequest(405);
        }

        public function options() {
            header('Allow: GET, POST, PUT, OPTIONS');
        }
    }
?>