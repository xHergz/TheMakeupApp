<?php
    require_once __DIR__. "/../Common/ApiUtilities.php";
    require_once __DIR__. "/../Common/Log.php";
    require_once __DIR__. "/../Data/ApiRequest.php";
    require_once __DIR__. "/../Data/HttpStatus.php";
    require_once __DIR__. "/../DataAccessLayer/AllergySensitivityDal.php";
    require_once __DIR__. "/../Helpers/AuthorizationMethods.php";
    require_once 'IApiEndpoint.php';

    class AllergySensitivityEndpoint implements IApiEndpoint {
        const CLIENT_PROFILE_ID_KEY = "clientProfileId";

        const DESCRIPTION_KEY = "description";

        const DISPLAY_NAME_KEY = "displayName";

        public function get() {
            $apiRequest = new ApiRequest($_GET, 'AllergySensitivity');
            // Request if only available for displayName: ../allergy-sensitivity?displayName=""
            if (!$apiRequest->HasOnlySpecifiedKeys(self::DISPLAY_NAME_KEY)) {
                $apiRequest->EndRequest(HttpStatus::BAD_REQUEST, "Invalid parameter combination");
            }

            // Make sure session owns client to get allergies and sensitivities
            $displayName = $apiRequest->GetKey(self::DISPLAY_NAME_KEY);
            $authorizeSessionForClientResponse = AuthorizeSessionForClientProfileByDisplayName(GetBearerToken(), $displayName);
            if ($authorizeSessionForClientResponse != Errors::SUCCESS) {
                $apiRequest->EndRequest(HttpStatus::UNAUTHORIZED, Errors::GetErrorMessage($authorizeSessionForClientResponse));
            }

            $allergySensitivityDal = new AllergySensitivityDal();
            if (!$allergySensitivityDal->Initialize()) {
                $apiRequest->EndRequest(HttpStatus::INTERNAL_SERVER_ERROR, 'Database connection could not be initialized');
            }

            $apiRequest->LogRequest();
            $response = $allergySensitivityDal->GetAllergiesAndSensitivities($displayName);
            $jsonResponse = $allergySensitivityDal->EncodeResponse($response);
            Log::LogInformation('AllergySensitivity GET Response: ' . $jsonResponse);
            echo $jsonResponse;
            $allergySensitivityDal->Close();
        }

        public function post() {
            BadRequest(405);
        }

        public function put() {
            $apiRequest = new ApiRequest(GetPutInput(), 'AllergySensitivity');
            // Request if only available for displayName: ../allergy-sensitivity
            if (!$apiRequest->HasOnlySpecifiedKeys(self::CLIENT_PROFILE_ID_KEY, self::DESCRIPTION_KEY)) {
                $apiRequest->EndRequest(HttpStatus::BAD_REQUEST, "Invalid parameter combination");
            }

            // Make sure session owns client to get allergies and sensitivities
            $clientProfileId = $apiRequest->GetKey(self::CLIENT_PROFILE_ID_KEY);
            $description = $apiRequest->GetKey(self::DESCRIPTION_KEY);
            $authorizeSessionForClientResponse = AuthorizeSessionForClientProfile(GetBearerToken(), $clientProfileId);
            if ($authorizeSessionForClientResponse != Errors::SUCCESS) {
                $apiRequest->EndRequest(HttpStatus::UNAUTHORIZED, Errors::GetErrorMessage($authorizeSessionForClientResponse));
            }

            $allergySensitivityDal = new AllergySensitivityDal();
            if (!$allergySensitivityDal->Initialize()) {
                $apiRequest->EndRequest(HttpStatus::INTERNAL_SERVER_ERROR, 'Database connection could not be initialized');
            }

            $apiRequest->LogRequest();
            $response = $allergySensitivityDal->AddCustomAllergySensitivity($clientProfileId, $description);
            $jsonResponse = $allergySensitivityDal->EncodeResponse($response);
            Log::LogInformation('AllergySensitivity PUT Response: ' . $jsonResponse);
            echo $jsonResponse;
            $allergySensitivityDal->Close();
        }

        public function delete() {
            BadRequest(405);
        }

        public function options() {
            header('Allow: GET, PUT, OPTIONS');
        }
    }
?>