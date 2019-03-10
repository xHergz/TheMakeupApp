<?php
    require_once __DIR__. "/../Common/ApiUtilities.php";
    require_once __DIR__. "/../Common/Log.php";
    require_once __DIR__. "/../Data/ApiRequest.php";
    require_once __DIR__. "/../Data/HttpStatus.php";
    require_once __DIR__. "/../DataAccessLayer/ClientHeadshotDal.php";
    require_once __DIR__. "/../Helpers/AuthorizationMethods.php";
    require_once __DIR__. "/../Helpers/FileMethods.php";
    require_once 'IApiEndpoint.php';

    class ClientHeadshotEndpoint implements IApiEndpoint {
        const CLIENT_PROFILE_ID_KEY = "clientProfileId";

        const DISPLAY_NAME_KEY = "displayName";

        const HEADSHOT_TYPE_ID_KEY = "headshotTypeId";

        const PICTURE_KEY = "picture";

        public function get() {
            $apiRequest = new ApiRequest($_GET, 'ClientHeadshot');
            // Request if only available for displayName: ../client-headshot?displayName=""
            if (!$apiRequest->HasOnlySpecifiedKeys(self::DISPLAY_NAME_KEY)) {
                $apiRequest->EndRequest(HttpStatus::BAD_REQUEST, "Invalid parameter combination");
            }

            // Make sure session owns client or is an artist to get the headshots
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

            $clientHeadshotDal = new ClientHeadshotDal();
            if (!$clientHeadshotDal->Initialize()) {
                $apiRequest->EndRequest(HttpStatus::INTERNAL_SERVER_ERROR, 'Database connection could not be initialized');
            }

            $apiRequest->LogRequest();
            $response = $clientHeadshotDal->GetClientHeadshots($displayName);
            $jsonResponse = $clientHeadshotDal->EncodeResponse($response);
            Log::LogInformation('ClientHeadshot GET Response: ' . $jsonResponse);
            echo $jsonResponse;
            $clientHeadshotDal->Close();
        }

        public function post() {
            BadRequest(405);
        }

        public function put() {
            $apiRequest = new ApiRequest(GetPutInput(), 'ClientHeadshot');
            $apiRequest->LogRequest();
            // Request if only available for ../client-headshot
            if (!$apiRequest->HasOnlySpecifiedKeys(self::CLIENT_PROFILE_ID_KEY, self::HEADSHOT_TYPE_ID_KEY, self::PICTURE_KEY)) {
                $apiRequest->EndRequest(HttpStatus::BAD_REQUEST, "Invalid parameter combination");
            }

            $clientProfileId = $apiRequest->GetKey(self::CLIENT_PROFILE_ID_KEY);
            $headshotTypeId = $apiRequest->GetKey(self::HEADSHOT_TYPE_ID_KEY);
            $picture = $apiRequest->GetKey(self::PICTURE_KEY);
            // Make sure session owns client
            $authorizeSessionForClientResponse = AuthorizeSessionForClientProfile(GetBearerToken(), $clientProfileId);
            if ($authorizeSessionForClientResponse != Errors::SUCCESS) {
                $apiRequest->EndRequest(HttpStatus::UNAUTHORIZED, Errors::GetErrorMessage($authorizeSessionForClientResponse));
            }

            $clientHeadshotDal = new ClientHeadshotDal();
            if (!$clientHeadshotDal->Initialize()) {
                $apiRequest->EndRequest(HttpStatus::INTERNAL_SERVER_ERROR, 'Database connection could not be initialized');
            }

            // Upload the headshot picture
            $userId = GetUserIdBySessionKey(GetBearerToken());
            $imagePath = UploadClientHeadshotImage($picture, $userId);
            if ($imagePath == null) {
                $apiRequest->EndRequest(HttpStatus::INTERNAL_SERVER_ERROR, 'Failed to upload the client profile picture');
            }
            $response = $clientHeadshotDal->AddClientHeadshot($clientProfileId, $headshotTypeId, $imagePath);
            $jsonResponse = $clientHeadshotDal->EncodeResponse($response);
            Log::LogInformation('ClientHeadshot PUT Response: ' . $jsonResponse);
            echo $jsonResponse;
            $clientHeadshotDal->Close();
        }

        public function delete() {
            $apiRequest = new ApiRequest($_GET, 'ClientHeadshot');
            // Request if only available for unique ids
            if (!$apiRequest->IsForUniqueId()) {
                $apiRequest->EndRequest(HttpStatus::NOT_FOUND, "Request is not for unique id");
            }

            $clientHeadshotId = $apiRequest->GetUniqueId();
            // Make sure session owns client
            $authorizeSessionForClientHeadshotResponse = AuthorizeSessionForClientHeadshot(GetBearerToken(), $clientHeadshotId);
            if ($authorizeSessionForClientHeadshotResponse != Errors::SUCCESS) {
                $apiRequest->EndRequest(HttpStatus::UNAUTHORIZED, Errors::GetErrorMessage($authorizeSessionForClientHeadshotResponse));
            }

            $clientHeadshotDal = new ClientHeadshotDal();
            if (!$clientHeadshotDal->Initialize()) {
                $apiRequest->EndRequest(HttpStatus::INTERNAL_SERVER_ERROR, 'Database connection could not be initialized');
            }

            $apiRequest->LogRequest();
            // Upload the headshot picture
            $response = $clientHeadshotDal->DeleteClientHeadshot($clientHeadshotId);
            $jsonResponse = $clientHeadshotDal->EncodeResponse($response);
            Log::LogInformation('ClientHeadshot PUT Response: ' . $jsonResponse);
            echo $jsonResponse;
            $clientHeadshotDal->Close();
        }

        public function options() {
            header('Allow: GET, PUT, DELETE, OPTIONS');
        }
    }
?>