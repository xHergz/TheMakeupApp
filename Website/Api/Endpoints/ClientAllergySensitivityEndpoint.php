<?php
    require_once __DIR__. "/../Common/ApiUtilities.php";
    require_once __DIR__. "/../Common/Log.php";
    require_once __DIR__. "/../Data/ApiRequest.php";
    require_once __DIR__. "/../Data/HttpStatus.php";
    require_once __DIR__. "/../DataAccessLayer/ClientAllergySensitivityDal.php";
    require_once __DIR__. "/../Helpers/AuthorizationMethods.php";
    require_once 'IApiEndpoint.php';

    class ClientAllergySensitivityEndpoint implements IApiEndpoint {
        const ALLERGY_SENSITIVITY_ID_KEY = "allergySensitivityId";

        const CLIENT_PROFILE_ID_KEY = "clientProfileId";        

        const DISPLAY_NAME_KEY = "displayName";

        public function get() {
            $apiRequest = new ApiRequest($_GET, 'ClientAllergySensitivity');
            // Request if only available for displayName: ../client-allergy-sensitivity?displayName=""
            if (!$apiRequest->HasOnlySpecifiedKeys(self::DISPLAY_NAME_KEY)) {
                $apiRequest->EndRequest(HttpStatus::BAD_REQUEST, "Invalid parameter combination");
            }

            // Make sure session owns client or is an artist to get the allergies and sensitivities
            $displayName = $apiRequest->GetKey(self::DISPLAY_NAME_KEY);
            $authorizeSessionForClientResponse = AuthorizeSessionForClientProfileByDisplayName(GetBearerToken(), $displayName);
            $authorizeSessionIsArtist = AuthorizeSessionIsArtist(GetBearerToken());
            if ($authorizeSessionForClientResponse != Errors::SUCCESS && $authorizeSessionIsArtist != Errors::SUCCESS) {
                if ($authorizeSessionForClientResponse != Errors::SUCCESS) {
                    $apiRequest->EndRequest(HttpStatus::UNAUTHORIZED, Errors::GetErrorMessage($authorizeSessionForClientResponse));
                }
                if ($authorizeSessionIsArtist != Errors::SUCCESS) {
                    $apiRequest->EndRequest(HttpStatus::UNAUTHORIZED, Errors::GetErrorMessage($authorizeSessionIsArtist));
                }
            }

            $clientAllergySensitivityDal = new ClientAllergySensitivityDal();
            if (!$clientAllergySensitivityDal->Initialize()) {
                $apiRequest->EndRequest(HttpStatus::INTERNAL_SERVER_ERROR, 'Database connection could not be initialized');
            }

            $apiRequest->LogRequest();
            $response = $clientAllergySensitivityDal->GetClientAllergiesAndSensitivities($displayName);
            $jsonResponse = $clientAllergySensitivityDal->EncodeResponse($response);
            Log::LogInformation('ClientAllergySensitivity GET Response: ' . $jsonResponse);
            echo $jsonResponse;
            $clientAllergySensitivityDal->Close();
        }

        public function post() {
            BadRequest(405);
        }

        public function put() {
            $apiRequest = new ApiRequest(GetPutInput(), 'ClientAllergySensitivity');
            // Request if only available for ../client-allergy-sensitivity
            if (!$apiRequest->HasOnlySpecifiedKeys(self::CLIENT_PROFILE_ID_KEY, self::ALLERGY_SENSITIVITY_ID_KEY)) {
                $apiRequest->EndRequest(HttpStatus::BAD_REQUEST, "Invalid parameter combination");
            }

            $clientProfileId = $apiRequest->GetKey(self::CLIENT_PROFILE_ID_KEY);
            $allergySensitivityId = $apiRequest->GetKey(self::ALLERGY_SENSITIVITY_ID_KEY);
            // Make sure session owns client to add allergy and sensitivity
            $authorizeSessionForClientResponse = AuthorizeSessionForClientProfile(GetBearerToken(), $clientProfileId);
            if ($authorizeSessionForClientResponse != Errors::SUCCESS) {
                $apiRequest->EndRequest(HttpStatus::UNAUTHORIZED, Errors::GetErrorMessage($authorizeSessionForClientResponse));
            }

            $clientAllergySensitivityDal = new ClientAllergySensitivityDal();
            if (!$clientAllergySensitivityDal->Initialize()) {
                $apiRequest->EndRequest(HttpStatus::INTERNAL_SERVER_ERROR, 'Database connection could not be initialized');
            }

            $apiRequest->LogRequest();
            $response = $clientAllergySensitivityDal->AddClientAllergySensitivity($clientProfileId, $allergySensitivityId);
            $jsonResponse = $clientAllergySensitivityDal->EncodeResponse($response);
            Log::LogInformation('ClientAllergySensitivity PUT Response: ' . $jsonResponse);
            echo $jsonResponse;
            $clientAllergySensitivityDal->Close();
        }

        public function delete() {
            $apiRequest = new ApiRequest($_GET, 'ClientAllergySensitivity');
            // Request if only available for ../client-allergy-sensitivity?clientProfileId=&allergySensitivityId=
            if (!$apiRequest->HasOnlySpecifiedKeys(self::CLIENT_PROFILE_ID_KEY, self::ALLERGY_SENSITIVITY_ID_KEY)) {
                $apiRequest->EndRequest(HttpStatus::BAD_REQUEST, "Invalid parameter combination");
            }

            $clientProfileId = $apiRequest->GetKey(self::CLIENT_PROFILE_ID_KEY);
            $allergySensitivityId = $apiRequest->GetKey(self::ALLERGY_SENSITIVITY_ID_KEY);
            // Make sure session owns client to delete allergy sensitivity
            $authorizeSessionForClientResponse = AuthorizeSessionForClientProfile(GetBearerToken(), $clientProfileId);
            if ($authorizeSessionForClientResponse != Errors::SUCCESS) {
                $apiRequest->EndRequest(HttpStatus::UNAUTHORIZED, Errors::GetErrorMessage($authorizeSessionForClientResponse));
            }

            $clientAllergySensitivityDal = new ClientAllergySensitivityDal();
            if (!$clientAllergySensitivityDal->Initialize()) {
                $apiRequest->EndRequest(HttpStatus::INTERNAL_SERVER_ERROR, 'Database connection could not be initialized');
            }

            $apiRequest->LogRequest();
            $response = $clientAllergySensitivityDal->DeleteClientAllergySensitivity($clientProfileId, $allergySensitivityId);
            $jsonResponse = $clientAllergySensitivityDal->EncodeResponse($response);
            Log::LogInformation('ClientAllergySensitivity DELETE Response: ' . $jsonResponse);
            echo $jsonResponse;
            $clientAllergySensitivityDal->Close();
        }

        public function options() {
            header('Allow: GET, PUT, DELETE, OPTIONS');
        }
    }
?>