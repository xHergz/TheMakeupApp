<?php
    require_once __DIR__. "/../Common/ApiUtilities.php";
    require_once __DIR__. "/../Common/Log.php";
    require_once __DIR__. "/../Data/ApiRequest.php";
    require_once __DIR__. "/../Data/HttpStatus.php";
    require_once __DIR__. "/../DataAccessLayer/ArtistServiceConsultationDal.php";
    require_once __DIR__. "/../Helpers/AuthorizationMethods.php";
    require_once 'IApiEndpoint.php';

    class ArtistServiceConsultationEndpoint implements IApiEndpoint {
        const ARTIST_SERVICE_ID_KEY = "artistServiceId";

        const CONSULTATION_TYPE_ID = "consultationTypeId";

        const DISPLAY_NAME_KEY = "displayName";

        const PRICE_KEY = "price";

        public function get() {
            $apiRequest = new ApiRequest($_GET, 'ArtistServiceConsultation');
            $apiRequest->LogRequest();
            // This method only supports being called by unique id: ../artist-service-Consultation/displayName=""
            if (!$apiRequest->IsForUniqueId()) {
                $apiRequest->EndRequest(HttpStatus::NOT_FOUND, 'Request is not for unique id');
            }

            $authorizationResponse = AuthorizeSession(GetBearerToken());
            if ($authorizationResponse != Errors::SUCCESS) {
                $apiRequest->EndRequest(HttpStatus::UNAUTHORIZED, Errors::GetErrorMessage($authorizationResponse));
            }

            $artistServiceConsultationDal = new ArtistServiceConsultationDal();
            if (!$artistServiceConsultationDal->Initialize()) {
                $apiRequest->EndRequest(HttpStatus::INTERNAL_SERVER_ERROR, 'Database connection could not be initialized');
            }
            
            $displayName = $apiRequest->GetUniqueId();
            $response = $artistServiceConsultationDal->GetArtistServiceConsultations($displayName);
            $jsonResponse = $artistServiceConsultationDal->EncodeResponse($response);
            Log::LogInformation('ArtistServiceConsultation GET Response: ' . $jsonResponse);
            echo $jsonResponse;
            $artistServiceConsultationDal->Close();
        }

        public function post() {
            BadRequest(405);
        }

        public function put() {
            $apiRequest = new ApiRequest(GetPutInput(), 'ArtistServiceConsultation');
            $apiRequest->LogRequest();

            if (!$apiRequest->HasOnlySpecifiedKeys(self::ARTIST_SERVICE_ID_KEY, self::CONSULTATION_TYPE_ID, self::PRICE_KEY)){
                $apiRequest->EndRequest(HttpStatus::BAD_REQUEST, "Invalid parameter combination");
            }

            $artistServiceId = $apiRequest->GetKey(self::ARTIST_SERVICE_ID_KEY);
            $consultationTypeId = $apiRequest->GetKey(self::CONSULTATION_TYPE_ID);
            $price = $apiRequest->GetKey(self::PRICE_KEY);

            $authorizationResponse = AuthorizeSessionForArtistService(GetBearerToken(), $artistServiceId);
            if ($authorizationResponse != Errors::SUCCESS) {
                $apiRequest->EndRequest(HttpStatus::UNAUTHORIZED, Errors::GetErrorMessage($authorizationResponse));
            }

            $artistServiceConsultationDal = new ArtistServiceConsultationDal();
            if (!$artistServiceConsultationDal->Initialize()) {
                $apiRequest->EndRequest(HttpStatus::INTERNAL_SERVER_ERROR, 'Database connection could not be initialized');
            }

            $response = $artistServiceConsultationDal->AddArtistServiceConsultation($artistServiceId, $consultationTypeId, $price);
            $jsonResponse = $artistServiceConsultationDal->EncodeResponse($response);
            Log::LogInformation('ArtistServiceConsultation PUT Response: ' . $jsonResponse);
            echo $jsonResponse;
            $artistServiceConsultationDal->Close();
        }

        public function delete() {
            $apiRequest = new ApiRequest($_GET, 'ArtistServiceConsultation');
            $apiRequest->LogRequest();

            if (!$apiRequest->IsForUniqueId()){
                $apiRequest->EndRequest(HttpStatus::BAD_REQUEST, "Request is not for unique id");
            }

            $artistServiceConsultationId = $apiRequest->GetUniqueId();
            $authorizationResponse = AuthorizeSessionForArtistServiceConsultation(GetBearerToken(), $artistServiceConsultationId);
            if ($authorizationResponse != Errors::SUCCESS) {
                $apiRequest->EndRequest(HttpStatus::UNAUTHORIZED, Errors::GetErrorMessage($authorizationResponse));
            }

            $artistServiceConsultationDal = new ArtistServiceConsultationDal();
            if (!$artistServiceConsultationDal->Initialize()) {
                $apiRequest->EndRequest(HttpStatus::INTERNAL_SERVER_ERROR, 'Database connection could not be initialized');
            }

            $response = $artistServiceConsultationDal->DeleteArtistServiceConsultation($artistServiceConsultationId);
            $jsonResponse = $artistServiceConsultationDal->EncodeResponse($response);
            Log::LogInformation('ArtistServiceConsultation DELETE Response: ' . $jsonResponse);
            echo $jsonResponse;
            $artistServiceConsultationDal->Close();
        }

        public function options() {
            header('Allow: GET, OPTIONS');
        }
    }
?>