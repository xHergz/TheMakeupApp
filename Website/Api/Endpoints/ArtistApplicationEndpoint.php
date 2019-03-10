<?php
    require_once __DIR__. "/../Common/ApiUtilities.php";
    require_once __DIR__. "/../Common/Log.php";
    require_once __DIR__. "/../Data/ApiRequest.php";
    require_once __DIR__. "/../Data/HttpStatus.php";
    require_once __DIR__. "/../DataAccessLayer/ArtistApplicationDal.php";
    require_once __DIR__. "/../Helpers/AuthorizationMethods.php";
    require_once 'IApiEndpoint.php';

    class ArtistApplicationEndpoint implements IApiEndpoint {
        const CLIENT_PROFILE_ID_KEY = "clientProfileId";

        const COVER_LETTER_KEY = "coverLetter";

        const RESUME_KEY = "resume";

        public function get() {
            BadRequest(405);
        }

        public function post() {
            BadRequest(405);
        }

        public function put() {
            $apiRequest = new ApiRequest(GetPutInput(), 'ArtistApplication');
            $apiRequest->LogRequest();

            // Make sure request has keys
            if (!$apiRequest->HasOnlySpecifiedKeys(self::CLIENT_PROFILE_ID_KEY, self::COVER_LETTER_KEY, self::RESUME_KEY)) {
                $apiRequest->EndRequest(HttpStatus::BAD_REQUEST, "Invalid parameter combination");
            }

            $clientProfileId = $apiRequest->GetKey(self::CLIENT_PROFILE_ID_KEY);
            $resumeData = $apiRequest->GetKey(self::RESUME_KEY);
            $coverLetterData = $apiRequest->GetKey(self::COVER_LETTER_KEY);
            // Authorize Session Key Owns Client Profile
            $authorizeSessionForClientResponse = AuthorizeSessionForClientProfile(GetBearerToken(), $clientProfileId);
            if ($authorizeSessionForClientResponse != Errors::SUCCESS) {
                $apiRequest->EndRequest(HttpStatus::UNAUTHORIZED, Errors::GetErrorMessage($authorizeSessionForClientResponse));
            }

            $artistApplicationDal = new ArtistApplicationDal();
            if (!$artistApplicationDal->Initialize()) {
                $apiRequest->EndRequest(HttpStatus::INTERNAL_SERVER_ERROR, 'Database connection could not be initialized');
            }

            // Begin Transaction
            $artistApplicationDal->BeginTransaction();

            // Save Resume and Cover Letter

            // Create Application

            // Add all links

            // Commit transaction

            // Return status response
        }

        public function delete() {
            BadRequest(405);
        }

        public function options() {
            header('Allow: GET, OPTIONS');
        }
    }
?>