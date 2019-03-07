<?php
    require_once __DIR__. "/../Common/ApiUtilities.php";
    require_once __DIR__. "/../Common/Log.php";
    require_once __DIR__. "/../Data/ApiRequest.php";
    require_once __DIR__. "/../Data/HttpStatus.php";
    require_once __DIR__. "/../DataAccessLayer/ClientProductPreferenceDal.php";
    require_once __DIR__. "/../Helpers/AuthorizationMethods.php";
    require_once 'IApiEndpoint.php';

    class ClientProductPreferenceEndpoint implements IApiEndpoint {
        const PRODUCT_PREFERENCE_ID_KEY = "productPreferenceId";

        const CLIENT_PROFILE_ID_KEY = "clientProfileId";        

        const DISPLAY_NAME_KEY = "displayName";

        public function get() {
            $apiRequest = new ApiRequest($_GET, 'ClientProductPreference');
            // Request if only available for displayName: ../client-product-preference?displayName=""
            if (!$apiRequest->HasOnlySpecifiedKeys(self::DISPLAY_NAME_KEY)) {
                $apiRequest->EndRequest(HttpStatus::BAD_REQUEST, "Invalid parameter combination");
            }

            // Make sure session owns client or is an artist to get the product preferences
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

            $clientProductPreferenceDal = new ClientProductPreferenceDal();
            if (!$clientProductPreferenceDal->Initialize()) {
                $apiRequest->EndRequest(HttpStatus::INTERNAL_SERVER_ERROR, 'Database connection could not be initialized');
            }

            $apiRequest->LogRequest();
            $response = $clientProductPreferenceDal->GetClientProductPreferences($displayName);
            $jsonResponse = $clientProductPreferenceDal->EncodeResponse($response);
            Log::LogInformation('ClientProductPreference GET Response: ' . $jsonResponse);
            echo $jsonResponse;
            $clientProductPreferenceDal->Close();
        }

        public function post() {
            BadRequest(405);
        }

        public function put() {
            $apiRequest = new ApiRequest(GetPutInput(), 'ClientProductPreference');
            // Request if only available for ../client-product-preference
            if (!$apiRequest->HasOnlySpecifiedKeys(self::CLIENT_PROFILE_ID_KEY, self::PRODUCT_PREFERENCE_ID_KEY)) {
                $apiRequest->EndRequest(HttpStatus::BAD_REQUEST, "Invalid parameter combination");
            }

            $clientProfileId = $apiRequest->GetKey(self::CLIENT_PROFILE_ID_KEY);
            $productPreferenceId = $apiRequest->GetKey(self::PRODUCT_PREFERENCE_ID_KEY);
            // Make sure session owns client to add product preferences
            $authorizeSessionForClientResponse = AuthorizeSessionForClientProfile(GetBearerToken(), $clientProfileId);
            if ($authorizeSessionForClientResponse != Errors::SUCCESS) {
                $apiRequest->EndRequest(HttpStatus::UNAUTHORIZED, Errors::GetErrorMessage($authorizeSessionForClientResponse));
            }

            $clientProductPreferenceDal = new ClientProductPreferenceDal();
            if (!$clientProductPreferenceDal->Initialize()) {
                $apiRequest->EndRequest(HttpStatus::INTERNAL_SERVER_ERROR, 'Database connection could not be initialized');
            }

            $apiRequest->LogRequest();
            $response = $clientProductPreferenceDal->AddClientProductPreference($clientProfileId, $productPreferenceId);
            $jsonResponse = $clientProductPreferenceDal->EncodeResponse($response);
            Log::LogInformation('ClientProductPreference PUT Response: ' . $jsonResponse);
            echo $jsonResponse;
            $clientProductPreferenceDal->Close();
        }

        public function delete() {
            $apiRequest = new ApiRequest($_GET, 'ClientProductPreference');
            // Request if only available for ../client-product-preference?clientProfileId=&productPreferenceId=
            if (!$apiRequest->HasOnlySpecifiedKeys(self::CLIENT_PROFILE_ID_KEY, self::PRODUCT_PREFERENCE_ID_KEY)) {
                $apiRequest->EndRequest(HttpStatus::BAD_REQUEST, "Invalid parameter combination");
            }

            $clientProfileId = $apiRequest->GetKey(self::CLIENT_PROFILE_ID_KEY);
            $productPreferenceId = $apiRequest->GetKey(self::PRODUCT_PREFERENCE_ID_KEY);
            // Make sure session owns client to delete allergy sensitivity
            $authorizeSessionForClientResponse = AuthorizeSessionForClientProfile(GetBearerToken(), $clientProfileId);
            if ($authorizeSessionForClientResponse != Errors::SUCCESS) {
                $apiRequest->EndRequest(HttpStatus::UNAUTHORIZED, Errors::GetErrorMessage($authorizeSessionForClientResponse));
            }

            $clientProductPreferenceDal = new ClientProductPreferenceDal();
            if (!$clientProductPreferenceDal->Initialize()) {
                $apiRequest->EndRequest(HttpStatus::INTERNAL_SERVER_ERROR, 'Database connection could not be initialized');
            }

            $apiRequest->LogRequest();
            $response = $clientProductPreferenceDal->DeleteClientProductPreference($clientProfileId, $productPreferenceId);
            $jsonResponse = $clientProductPreferenceDal->EncodeResponse($response);
            Log::LogInformation('ClientProductPreference DELETE Response: ' . $jsonResponse);
            echo $jsonResponse;
            $clientProductPreferenceDal->Close();
        }

        public function options() {
            header('Allow: GET, PUT, DELETE, OPTIONS');
        }
    }
?>