<?php
    require_once __DIR__. "/../Common/ApiUtilities.php";
    require_once __DIR__. "/../Common/Log.php";
    require_once __DIR__. "/../Data/ApiRequest.php";
    require_once __DIR__. "/../Data/HttpStatus.php";
    require_once __DIR__. "/../DataAccessLayer/ProductPreferenceDal.php";
    require_once __DIR__. "/../Helpers/AuthorizationMethods.php";
    require_once 'IApiEndpoint.php';

    class ProductPreferenceEndpoint implements IApiEndpoint {
        const CLIENT_PROFILE_ID_KEY = "clientProfileId";

        const DESCRIPTION_KEY = "description";

        const DISPLAY_NAME_KEY = "displayName";

        public function get() {
            $apiRequest = new ApiRequest($_GET, 'ProductPreference');
            // Request if only available for displayName: ../product-preference?displayName=""
            if (!$apiRequest->HasOnlySpecifiedKeys(self::DISPLAY_NAME_KEY)) {
                $apiRequest->EndRequest(HttpStatus::BAD_REQUEST, "Invalid parameter combination");
            }

            // Make sure session owns client to get product preferences
            $displayName = $apiRequest->GetKey(self::DISPLAY_NAME_KEY);
            $authorizeSessionForClientResponse = AuthorizeSessionForClientProfileByDisplayName(GetBearerToken(), $displayName);
            if ($authorizeSessionForClientResponse != Errors::SUCCESS) {
                $apiRequest->EndRequest(HttpStatus::UNAUTHORIZED, Errors::GetErrorMessage($authorizeSessionForClientResponse));
            }

            $productPreferenceDal = new ProductPreferenceDal();
            if (!$productPreferenceDal->Initialize()) {
                $apiRequest->EndRequest(HttpStatus::INTERNAL_SERVER_ERROR, 'Database connection could not be initialized');
            }

            $apiRequest->LogRequest();
            $response = $productPreferenceDal->GetProductPreferences($displayName);
            $jsonResponse = $productPreferenceDal->EncodeResponse($response);
            Log::LogInformation('ProductPreference GET Response: ' . $jsonResponse);
            echo $jsonResponse;
            $productPreferenceDal->Close();
        }

        public function post() {
            BadRequest(405);
        }

        public function put() {
            $apiRequest = new ApiRequest(GetPutInput(), 'ProductPreference');
            // Request if only available for displayName: ../product-preference
            if (!$apiRequest->HasOnlySpecifiedKeys(self::CLIENT_PROFILE_ID_KEY, self::DESCRIPTION_KEY)) {
                $apiRequest->EndRequest(HttpStatus::BAD_REQUEST, "Invalid parameter combination");
            }

            // Make sure session owns client to get product preferences
            $clientProfileId = $apiRequest->GetKey(self::CLIENT_PROFILE_ID_KEY);
            $description = $apiRequest->GetKey(self::DESCRIPTION_KEY);
            $authorizeSessionForClientResponse = AuthorizeSessionForClientProfile(GetBearerToken(), $clientProfileId);
            if ($authorizeSessionForClientResponse != Errors::SUCCESS) {
                $apiRequest->EndRequest(HttpStatus::UNAUTHORIZED, Errors::GetErrorMessage($authorizeSessionForClientResponse));
            }

            $productPreferenceDal = new ProductPreferenceDal();
            if (!$productPreferenceDal->Initialize()) {
                $apiRequest->EndRequest(HttpStatus::INTERNAL_SERVER_ERROR, 'Database connection could not be initialized');
            }

            $apiRequest->LogRequest();
            $response = $productPreferenceDal->AddCustomProductPreference($clientProfileId, $description);
            $jsonResponse = $productPreferenceDal->EncodeResponse($response);
            Log::LogInformation('ProductPreference PUT Response: ' . $jsonResponse);
            echo $jsonResponse;
            $productPreferenceDal->Close();
        }

        public function delete() {
            BadRequest(405);
        }

        public function options() {
            header('Allow: GET, PUT, OPTIONS');
        }
    }
?>