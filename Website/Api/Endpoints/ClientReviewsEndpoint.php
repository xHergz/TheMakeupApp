<?php
    require_once __DIR__. "/../Common/ApiUtilities.php";
    require_once __DIR__. "/../Common/Log.php";
    require_once __DIR__. "/../Data/ApiRequest.php";
    require_once __DIR__. "/../Data/ClientReview.php";
    require_once __DIR__. "/../Data/HttpStatus.php";
    require_once __DIR__. "/../DataAccessLayer/ClientReviewsDal.php";
    require_once __DIR__. "/../Helpers/AuthorizationMethods.php";
    require_once 'IApiEndpoint.php';

    class ClientReviewsEndpoint implements IApiEndpoint {
        const ARTIST_PORTFOLIO_ID_KEY = "artistPortfolioId";

        const CLIENT_PROFILE_ID_KEY = "clientProfileId";

        const CLIENT_REVIEW_ID_KEY = "clientReviewId";

        const DISPLAY_NAME_KEY = "displayName";

        const RATING_KEY = "rating";

        const REVIEW_KEY = "review";


        public function get() {
            $apiRequest = new ApiRequest($_GET, 'ClientReviews');
            // This method only supports being called by displayName: ../client-reviews?displayName=""
            if (!$apiRequest->HasOnlySpecifiedKeys(self::DISPLAY_NAME_KEY)) {
                $apiRequest->EndRequest(HttpStatus::NOT_FOUND, 'Invalid parameter combination');
            }

            // Check if session key is artist and does not own the client profile
            $displayName = $apiRequest->GetKey(self::DISPLAY_NAME_KEY);
            $authorizeSessionIsArtistResponse = AuthorizeSessionIsArtist(GetBearerToken());
            $authorizeSessionForClientProfileResponse = AuthorizeSessionForClientProfileByDisplayName(GetBearerToken(), $displayName);
            if ($authorizeSessionIsArtistResponse != Errors::SUCCESS
                && $authorizeSessionForClientProfileResponse != Errors::CLIENT_PROFILE_DOES_NOT_BELONG_TO_SESSION) {
                if ($authorizeSessionIsArtistResponse != Errors::SUCCESS) {
                    $apiRequest->EndRequest(HttpStatus::UNAUTHORIZED, Errors::GetErrorMessage($authorizeSessionIsArtistResponse));
                }
                else if ($authorizeSessionForClientProfileResponse == Errors::SUCCESS) {
                    $apiRequest->EndRequest(HttpStatus::UNAUTHORIZED, "Session owns client profile");
                }
                else {
                    $apiRequest->EndRequest(HttpStatus::UNAUTHORIZED, $authorizeSessionForClientProfileResponse);
                }
            }

            $clientReviewsDal = new ClientReviewsDal();
            if (!$clientReviewsDal->Initialize()) {
                $apiRequest->EndRequest(HttpStatus::INTERNAL_SERVER_ERROR, 'Database connection could not be initialized');
            }

            $apiRequest->LogRequest();
            $response = $clientReviewsDal->GetClientReviews($displayName);
            $jsonResponse = $clientReviewsDal->EncodeResponse($response);
            Log::LogInformation('ClientReviews GET Response: ' . $jsonResponse);
            echo $jsonResponse;
            $clientReviewsDal->Close();
        }

        public function post() {
            $apiRequest = new ApiRequest($_POST, 'ClientReviews');
            
            // This method only accepts calls for unique ids
            if (!$apiRequest->IsForUniqueId()) {
                $apiRequest->EndRequest(HttpStatus::NOT_FOUND, "Request is not for unique id");
            }

            // Make sure all the fields are set
            if (!$apiRequest->HasOnlySpecifiedKeys(self::RATING_KEY, self::REVIEW_KEY)){
                $apiRequest->EndRequest(HttpStatus::BAD_REQUEST, "Invalid parameter combination");
            }

            $clientReview = new ClientReview($apiRequest->GetUniqueId(), null, null,
                $apiRequest->GetKey(self::RATING_KEY), $apiRequest->GetKey(self::REVIEW_KEY));

            // Check if session key is valid and owns the client review its updating the profile of
            $authorizationResponse = AuthorizeSessionForClientReview(GetBearerToken(), $clientReview->ClientReviewId);
            if ($authorizationResponse != Errors::SUCCESS) {
                $apiRequest->EndRequest(HttpStatus::UNAUTHORIZED, Errors::GetErrorMessage($authorizationResponse));
            }

            $clientReviewsDal = new ClientReviewsDal();
            if (!$clientReviewsDal->Initialize()) {
                $apiRequest->EndRequest(HttpStatus::INTERNAL_SERVER_ERROR, 'Database connection could not be initialized');
            }

            $apiRequest->LogRequest();
            // Validate Client Profile Information
            if (!empty($clientReview->GetUpdateErrors())) {
                $apiRequest->EndRequest(HttpStatus::BAD_REQUEST, 'Invalid Parameters: ' . implode(', ', $clientReview->GetUpdateErrors()));
            }
            $response = $clientReviewsDal->UpdateClientReview($clientReview->ClientReviewId, $clientReview->Rating, $clientReview->Review);
            $jsonResponse = $clientReviewsDal->EncodeResponse($response);
            Log::LogInformation('ClientReviews POST Response: ' . $jsonResponse);
            echo $jsonResponse;
            $clientReviewsDal->Close();
        }

        public function put() {
            $apiRequest = new ApiRequest(GetPutInput(), 'ClientReviews');

            // Make sure all the fields are set
            if (!$apiRequest->HasOnlySpecifiedKeys(self::CLIENT_PROFILE_ID_KEY, self::ARTIST_PORTFOLIO_ID_KEY, self::RATING_KEY, self::REVIEW_KEY)){
                $apiRequest->EndRequest(HttpStatus::BAD_REQUEST, "Invalid parameter combination");
            }

            $clientReview = new ClientReview(null, $apiRequest->GetKey(self::CLIENT_PROFILE_ID_KEY),
                $apiRequest->GetKey(self::ARTIST_PORTFOLIO_ID_KEY), $apiRequest->GetKey(self::RATING_KEY), $apiRequest->GetKey(self::REVIEW_KEY));

            // Check if session key is an artist and does not own the client profile to post a review
            $authorizeSessionIsArtistResponse = AuthorizeSessionIsArtist(GetBearerToken());
            $authorizeSessionForClientProfileResponse = AuthorizeSessionForClientProfile(GetBearerToken(), $clientReview->ClientProfileId);
            if ($authorizeSessionIsArtistResponse != Errors::SUCCESS
                && $authorizeSessionForClientProfileResponse != Errors::CLIENT_PROFILE_DOES_NOT_BELONG_TO_SESSION) {
                if ($authorizeSessionIsArtistResponse != Errors::SUCCESS) {
                    $apiRequest->EndRequest(HttpStatus::UNAUTHORIZED, Errors::GetErrorMessage($authorizeSessionIsArtistResponse));
                }
                else if ($authorizeSessionForClientProfileResponse == Errors::SUCCESS) {
                    $apiRequest->EndRequest(HttpStatus::UNAUTHORIZED, "Session owns client profile");
                }
                else {
                    $apiRequest->EndRequest(HttpStatus::UNAUTHORIZED, $authorizeSessionForClientProfileResponse);
                }
            }

            $clientReviewsDal = new ClientReviewsDal();
            if (!$clientReviewsDal->Initialize()) {
                $apiRequest->EndRequest(HttpStatus::INTERNAL_SERVER_ERROR, 'Database connection could not be initialized');
            }

            $apiRequest->LogRequest();
            // Validate Client Profile Information
            if (!empty($clientReview->GetCreateErrors())) {
                $apiRequest->EndRequest(HttpStatus::BAD_REQUEST, 'Invalid Parameters: ' . implode(', ', $clientReview->GetCreateErrors()));
            }
            $response = $clientReviewsDal->AddClientReview($clientReview->ClientProfileId, $clientReview->ArtistPortfolioId,
                $clientReview->Rating, $clientReview->Review);
            $jsonResponse = $clientReviewsDal->EncodeResponse($response);
            Log::LogInformation('ClientReviews PUT Response: ' . $jsonResponse);
            echo $jsonResponse;
            $clientReviewsDal->Close();
        }

        public function delete() {
            $apiRequest = new ApiRequest($_GET, 'ClientReviews');
            
            // This method only accepts calls for unique ids
            if (!$apiRequest->IsForUniqueId()) {
                $apiRequest->EndRequest(HttpStatus::NOT_FOUND, "Request is not for unique id");
            }

            $clientReviewId = $apiRequest->GetUniqueId();
            // Check if session key is valid and owns the client review its updating the profile of
            $authorizationResponse = AuthorizeSessionForClientReview(GetBearerToken(), $clientReviewId);
            if ($authorizationResponse != Errors::SUCCESS) {
                $apiRequest->EndRequest(HttpStatus::UNAUTHORIZED, Errors::GetErrorMessage($authorizationResponse));
            }

            $clientReviewsDal = new ClientReviewsDal();
            if (!$clientReviewsDal->Initialize()) {
                $apiRequest->EndRequest(HttpStatus::INTERNAL_SERVER_ERROR, 'Database connection could not be initialized');
            }

            $apiRequest->LogRequest();
            $response = $clientReviewsDal->DeleteClientReview($clientReviewId);
            $jsonResponse = $clientReviewsDal->EncodeResponse($response);
            Log::LogInformation('ClientReviews DELETE Response: ' . $jsonResponse);
            echo $jsonResponse;
            $clientReviewsDal->Close();
        }

        public function options() {
            header('Allow: GET, POST, PUT, OPTIONS');
        }
    }
?>