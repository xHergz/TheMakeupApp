<?php
    require_once __DIR__. "/../Common/ApiUtilities.php";
    require_once __DIR__. "/../Common/Log.php";
    require_once __DIR__. "/../Data/ApiRequest.php";
    require_once __DIR__. "/../Data/HttpStatus.php";
    require_once __DIR__. "/../DataAccessLayer/ConsultationDal.php";
    require_once __DIR__. "/../Helpers/AuthorizationMethods.php";
    require_once 'IApiEndpoint.php';

    class ConsultationEndpoint implements IApiEndpoint {
        const ARTIST_PORTFOLIO_ID_KEY = 'artistPortfolioId';

        const CLIENT_PROFILE_ID_KEY = 'clientProfileId';

        public function get() {
            $apiRequest = new ApiRequest($_GET, 'Consultation');
            $apiRequest->LogRequest();

            if (!$apiRequest->IsForUniqueId()) {
                $apiRequest->EndRequest(HttpStatus::NOT_FOUND, 'Request is for unique id');
            }

            $consultationId = $apiRequest->GetUniqueId();
            $authorizationResponse = AuthorizeSessionForConsultation(GetBearerToken(), $consultationId);
            if ($authorizationResponse != Errors::SUCCESS) {
                $apiRequest->EndRequest(HttpStatus::UNAUTHORIZED, Errors::GetErrorMessage($authorizationResponse));
            }

            $consultationDal = new ConsultationDal();
            if (!$consultationDal->Initialize()) {
                $apiRequest->EndRequest(HttpStatus::INTERNAL_SERVER_ERROR, 'Database connection could not be initialized');
            }

            $response = $consultationDal->GetConsultationInformation($consultationId);
            $jsonResponse = $consultationDal->EncodeResponse($response);
            Log::LogInformation('Consultation GET Response: ' . $jsonResponse);
            echo $jsonResponse;
            $consultationDal->Close();
        }

        public function post() {
            BadRequest(405);
        }

        public function put() {
            $apiRequest = new ApiRequest(GetPutInput(), 'Consultation');
            $apiRequest->LogRequest();

            // Make sure all the fields are set
            if (!$apiRequest->HasOnlySpecifiedKeys(self::CLIENT_PROFILE_ID_KEY, self::ARTIST_PORTFOLIO_ID_KEY)){
                $apiRequest->EndRequest(HttpStatus::BAD_REQUEST, "Invalid parameter combination");
            }

            $clientProfileId = $apiRequest->GetKey(self::CLIENT_PROFILE_ID_KEY);
            $artistPortfolioId = $apiRequest->GetKey(self::ARTIST_PORTFOLIO_ID_KEY);
            // Check if session key is valid and owns the user id its creating a profile for
            $authorizationResponse = AuthorizeSessionForArtistPortfolio(GetBearerToken(), $artistPortfolioId);
            if ($authorizationResponse != Errors::SUCCESS) {
                $apiRequest->EndRequest(HttpStatus::UNAUTHORIZED, Errors::GetErrorMessage($authorizationResponse));
            }

            $consultationDal = new ConsultationDal();
            if (!$consultationDal->Initialize()) {
                $apiRequest->EndRequest(HttpStatus::INTERNAL_SERVER_ERROR, 'Database connection could not be initialized');
            }

            $response = $consultationDal->CreateConsultation($clientProfileId, $artistPortfolioId);
            $jsonResponse = $consultationDal->EncodeResponse($response);
            Log::LogInformation('Consultation PUT Response: ' . $jsonResponse);
            echo $jsonResponse;
            $consultationDal->Close();
        }

        public function delete() {
            BadRequest(405);
        }

        public function options() {
            header('Allow: GET, PUT, OPTIONS');
        }
    }
?>