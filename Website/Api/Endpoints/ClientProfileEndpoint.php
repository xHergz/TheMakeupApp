<?php
    require_once __DIR__. "/../Common/ApiUtilities.php";
    require_once __DIR__. "/../Common/Log.php";
    require_once __DIR__. "/../Data/ApiRequest.php";
    require_once __DIR__. "/../Data/ClientProfile.php";
    require_once __DIR__. "/../Data/Errors.php";
    require_once __DIR__. "/../Data/HttpStatus.php";
    require_once __DIR__. "/../DataAccessLayer/ClientProfileDal.php";
    require_once __DIR__. "/../Helpers/AuthorizationMethods.php";
    require_once __DIR__. "/../Helpers/FileMethods.php";
    require_once 'IApiEndpoint.php';

    class ClientProfileEndpoint implements IApiEndpoint {

        const BIOGRAPHY_KEY = "biography";

        const CLIENT_PROFILE_ID_KEY = "clientProfileId";

        const DISPLAY_NAME_KEY = "displayName";

        const EYE_COLOUR_ID_KEY = "eyeColourId";

        const HAIR_COLOUR_ID_KEY = "hairColourId";

        const PROFILE_PICTURE_KEY = "profilePicture";

        const SKIN_TONE_ID_KEY = "skinToneId";

        const USER_ID_KEY = "userId";

        public function get() {
            $apiRequest = new ApiRequest($_GET, 'ClientProfile');
            // This method only supports being called by unique id: ../client-profile/displayName=""
            if (!$apiRequest->IsForUniqueId()) {
                $apiRequest->EndRequest(HttpStatus::NOT_FOUND, 'Request is not for unique id');
            }

            // Check if session key is valid to get client profile information
            $authorizationResponse = AuthorizeSession(GetBearerToken());
            if ($authorizationResponse != Errors::SUCCESS) {
                $apiRequest->EndRequest(HttpStatus::UNAUTHORIZED, Errors::GetErrorMessage($authorizationResponse));
            }

            $clientProfileDal = new ClientProfileDal();
            if (!$clientProfileDal->Initialize()) {
                $apiRequest->EndRequest(HttpStatus::INTERNAL_SERVER_ERROR, 'Database connection could not be initialized');
            }

            $apiRequest->LogRequest();
            $response = null;
            $displayName = $apiRequest->GetUniqueId();
            $response = $clientProfileDal->GetClientProfile($displayName);

            $jsonResponse = $clientProfileDal->EncodeResponse($response);
            Log::LogInformation('ClientProfile GET Response: ' . $jsonResponse);
            echo $jsonResponse;
            $clientProfileDal->Close();
        }

        public function post() {
            $apiRequest = new ApiRequest($_POST, 'ClientProfile');
            $apiRequest->LogRequest();
            
            // This method only accepts calls for unique ids
            if (!$apiRequest->IsForUniqueId()) {
                $apiRequest->EndRequest(HttpStatus::NOT_FOUND, "Request is not for unique id");
            }

            // Make sure all the fields are set
            if (!$apiRequest->HasOnlySpecifiedKeys(self::PROFILE_PICTURE_KEY, self::BIOGRAPHY_KEY, self::EYE_COLOUR_ID_KEY,
                self::HAIR_COLOUR_ID_KEY, self::SKIN_TONE_ID_KEY)){
                $apiRequest->EndRequest(HttpStatus::BAD_REQUEST, "Invalid parameter combination");
            }

            $clientProfile = new ClientProfile($apiRequest->GetUniqueId(), null, null,
                $apiRequest->GetKey(self::BIOGRAPHY_KEY), $apiRequest->GetKey(self::EYE_COLOUR_ID_KEY),
                $apiRequest->GetKey(self::HAIR_COLOUR_ID_KEY), $apiRequest->GetKey(self::SKIN_TONE_ID_KEY));

            // Check if session key is valid and owns the user id its updating the profile of
            $authorizationResponse = AuthorizeSessionForClientProfile(GetBearerToken(), $clientProfile->ClientProfileId);
            if ($authorizationResponse != Errors::SUCCESS) {
                $apiRequest->EndRequest(HttpStatus::UNAUTHORIZED, Errors::GetErrorMessage($authorizationResponse));
            }

            $clientProfileDal = new ClientProfileDal();
            if (!$clientProfileDal->Initialize()) {
                $apiRequest->EndRequest(HttpStatus::INTERNAL_SERVER_ERROR, 'Database connection could not be initialized');
            }

            // Validate Client Profile Information
            if (!empty($clientProfile->GetUpdateErrors())) {
                $apiRequest->EndRequest(HttpStatus::BAD_REQUEST, 'Invalid Parameters: ' . implode(', ', $clientProfile->GetUpdateErrors()));
            }
            $profilePicture = $apiRequest->GetKey(self::PROFILE_PICTURE_KEY);
            $profilePictureUrl = null;
            if ($profilePicture != '' && $profilePicture != null) {
                // Upload the profile picture
                $profilePictureUrl = UploadClientProfileImage($apiRequest->GetKey(self::PROFILE_PICTURE_KEY), $clientProfile->UserId);
            }
            $response = $clientProfileDal->UpdateClientProfile($clientProfile->ClientProfileId, $profilePictureUrl, $clientProfile->Biography,
                $clientProfile->EyeColourId, $clientProfile->HairColourId, $clientProfile->SkinToneId);
            $jsonResponse = $clientProfileDal->EncodeResponse($response);
            Log::LogInformation('ClientProfile POST Response: ' . $jsonResponse);
            echo $jsonResponse;
            $clientProfileDal->Close();
        }

        public function put() {
            $apiRequest = new ApiRequest(GetPutInput(), 'ClientProfile');
            $apiRequest->LogRequest();

            // Make sure all the fields are set
            if (!$apiRequest->HasOnlySpecifiedKeys(self::USER_ID_KEY, self::PROFILE_PICTURE_KEY, self::BIOGRAPHY_KEY, self::EYE_COLOUR_ID_KEY,
                self::HAIR_COLOUR_ID_KEY, self::SKIN_TONE_ID_KEY)){
                $apiRequest->EndRequest(HttpStatus::BAD_REQUEST, "Invalid parameter combination");
            }

            $clientProfile = new ClientProfile(null, $apiRequest->GetKey(self::USER_ID_KEY), null, $apiRequest->GetKey(self::BIOGRAPHY_KEY),
                $apiRequest->GetKey(self::EYE_COLOUR_ID_KEY), $apiRequest->GetKey(self::HAIR_COLOUR_ID_KEY),
                $apiRequest->GetKey(self::SKIN_TONE_ID_KEY));

            // Check if session key is valid and owns the user id its creating a profile for
            $authorizationResponse = AuthorizeSessionForUser(GetBearerToken(), $clientProfile->UserId);
            if ($authorizationResponse != Errors::SUCCESS) {
                $apiRequest->EndRequest(HttpStatus::UNAUTHORIZED, Errors::GetErrorMessage($authorizationResponse));
            }

            $clientProfileDal = new ClientProfileDal();
            if (!$clientProfileDal->Initialize()) {
                $apiRequest->EndRequest(HttpStatus::INTERNAL_SERVER_ERROR, 'Database connection could not be initialized');
            }

            // Validate Client Profile Information
            if (!empty($clientProfile->GetCreateErrors())) {
                $apiRequest->EndRequest(HttpStatus::BAD_REQUEST, 'Invalid Parameters: ' . implode(', ', $clientProfile->GetCreateErrors()));
            }
            // Upload the profile picture
            $profilePictureData = $apiRequest->GetKey(self::PROFILE_PICTURE_KEY);
            if ($profilePictureData == null || $profilePictureData == '') {
                $profilePictureUrl = '/images/defaultProfilePic.png';
            }
            else {
                $profilePictureUrl = UploadClientProfileImage($profilePictureData, $clientProfile->UserId);
            }
            if ($profilePictureUrl == null) {
                $apiRequest->EndRequest(HttpStatus::INTERNAL_SERVER_ERROR, 'Failed to upload the client profile picture');
            }
            $response = $clientProfileDal->CreateClientProfile($clientProfile->UserId, $profilePictureUrl, $clientProfile->Biography,
                $clientProfile->EyeColourId, $clientProfile->HairColourId, $clientProfile->SkinToneId);
            $jsonResponse = $clientProfileDal->EncodeResponse($response);
            Log::LogInformation('ClientProfile PUT Response: ' . $jsonResponse);
            echo $jsonResponse;
            $clientProfileDal->Close();
        }

        public function delete() {
            BadRequest(405);
        }

        public function options() {
            header('Allow: GET, POST, PUT, OPTIONS');
        }
    }
?>