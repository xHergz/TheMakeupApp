<?php
    require_once __DIR__. "/../Common/ApiUtilities.php";
    require_once __DIR__. "/../Common/Log.php";
    require_once __DIR__. "/../Data/ApiRequest.php";
    require_once __DIR__. "/../Data/HttpStatus.php";
    require_once __DIR__. "/../DataAccessLayer/OnlineArtistDal.php";
    require_once __DIR__. "/../Helpers/AuthorizationMethods.php";
    require_once 'IApiEndpoint.php';

    class OnlineArtistEndpoint implements IApiEndpoint {
        const ARTIST_PORTFOLIO_ID_KEY = "artistPortfolioId";

        const LATITUDE_KEY = "latitude";

        const LONGITUDE_KEY = "longitude";

        const MAKEOVER_TYPE_ID_KEY = "makeoverTypeId";

        const MAX_DISTANCE_ID_KEY = "maxDistance";

        const SERVICE_TYPE_ID_KEY = "serviceTypeId";

        public function get() {
            $apiRequest = new ApiRequest($_GET, 'OnlineArtist');
            $apiRequest->LogRequest();
            // This method only supports being called by makeoverTypeId, serviceTypeId, userLongitude, userLatitude, and maxDistance
            if (!$apiRequest->HasOnlySpecifiedKeys(self::MAKEOVER_TYPE_ID_KEY, self::SERVICE_TYPE_ID_KEY, self::LONGITUDE_KEY,
                self::LATITUDE_KEY, self::MAX_DISTANCE_ID_KEY)) {
                $apiRequest->EndRequest(HttpStatus::NOT_FOUND, 'Invalid parameter combination');
            }

            $makeoverTypeId = $apiRequest->GetKey(self::MAKEOVER_TYPE_ID_KEY);
            $serviceTypeId = $apiRequest->GetKey(self::SERVICE_TYPE_ID_KEY);
            $userLongitude = $apiRequest->GetKey(self::LONGITUDE_KEY);
            $userLatitude = $apiRequest->GetKey(self::LATITUDE_KEY);
            $maxDistance = $apiRequest->GetKey(self::MAX_DISTANCE_ID_KEY);

            $onlineArtistDal = new OnlineArtistDal();
            if (!$onlineArtistDal->Initialize()) {
                $apiRequest->EndRequest(HttpStatus::INTERNAL_SERVER_ERROR, 'Database connection could not be initialized');
            }

            $response = $onlineArtistDal->SearchOnlineArtists($makeoverTypeId, $serviceTypeId, $userLongitude, $userLatitude, $maxDistance);
            $jsonResponse = $onlineArtistDal->EncodeResponse($response);
            Log::LogInformation('OnlineArtist GET Response: ' . $jsonResponse);
            echo $jsonResponse;
            $onlineArtistDal->Close();
        }

        public function post() {
            BadRequest(405);
        }

        public function put() {
            $apiRequest = new ApiRequest(GetPutInput(), 'OnlineArtist');
            $apiRequest->LogRequest();

            if (!$apiRequest->HasOnlySpecifiedKeys(self::ARTIST_PORTFOLIO_ID_KEY, self::LONGITUDE_KEY, self::LATITUDE_KEY)){
                $apiRequest->EndRequest(HttpStatus::BAD_REQUEST, "Invalid parameter combination");
            }

            $artistPortfolioId = $apiRequest->GetKey(self::ARTIST_PORTFOLIO_ID_KEY);
            $artistLongitude = $apiRequest->GetKey(self::LONGITUDE_KEY);
            $artistLatitude = $apiRequest->GetKey(self::LATITUDE_KEY);

            $authorizationResponse = AuthorizeSessionForArtistPortfolio(GetBearerToken(), $artistPortfolioId);
            if ($authorizationResponse != Errors::SUCCESS) {
                $apiRequest->EndRequest(HttpStatus::UNAUTHORIZED, Errors::GetErrorMessage($authorizationResponse));
            }

            $onlineArtistDal = new OnlineArtistDal();
            if (!$onlineArtistDal->Initialize()) {
                $apiRequest->EndRequest(HttpStatus::INTERNAL_SERVER_ERROR, 'Database connection could not be initialized');
            }

            $response = $onlineArtistDal->SetArtistOnline($artistPortfolioId, $artistLongitude, $artistLatitude);
            $jsonResponse = $onlineArtistDal->EncodeResponse($response);
            Log::LogInformation('OnlineArtist PUT Response: ' . $jsonResponse);
            echo $jsonResponse;
            $onlineArtistDal->Close();
        }

        public function delete() {
            $apiRequest = new ApiRequest($_GET, 'OnlineArtist');
            $apiRequest->LogRequest();

            if (!$apiRequest->HasOnlySpecifiedKeys(self::ARTIST_PORTFOLIO_ID_KEY)){
                $apiRequest->EndRequest(HttpStatus::BAD_REQUEST, "Invalid parameter combination");
            }

            $artistPortfolioId = $apiRequest->GetKey(self::ARTIST_PORTFOLIO_ID_KEY);

            $authorizationResponse = AuthorizeSessionForArtistPortfolio(GetBearerToken(), $artistPortfolioId);
            if ($authorizationResponse != Errors::SUCCESS) {
                $apiRequest->EndRequest(HttpStatus::UNAUTHORIZED, Errors::GetErrorMessage($authorizationResponse));
            }

            $onlineArtistDal = new OnlineArtistDal();
            if (!$onlineArtistDal->Initialize()) {
                $apiRequest->EndRequest(HttpStatus::INTERNAL_SERVER_ERROR, 'Database connection could not be initialized');
            }

            $response = $onlineArtistDal->SetArtistOffline($artistPortfolioId);
            $jsonResponse = $onlineArtistDal->EncodeResponse($response);
            Log::LogInformation('OnlineArtist DELETE Response: ' . $jsonResponse);
            echo $jsonResponse;
            $onlineArtistDal->Close();
        }

        public function options() {
            header('Allow: GET, PUT, DELETE, OPTIONS');
        }
    }
?>