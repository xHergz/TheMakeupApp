<?php
    require_once __DIR__. "/../Common/ApiUtilities.php";
    require_once __DIR__. "/../Common/Log.php";
    require_once __DIR__. "/../Data/ApiRequest.php";
    require_once __DIR__. "/../Data/HttpStatus.php";
    require_once __DIR__. "/../DataAccessLayer/ArtistApplicationDal.php";
    require_once __DIR__. "/../Helpers/AuthorizationMethods.php";
    require_once __DIR__. "/../Helpers/FileMethods.php";
    require_once 'IApiEndpoint.php';

    class ArtistApplicationEndpoint implements IApiEndpoint {
        const CLIENT_PROFILE_ID_KEY = "clientProfileId";

        const COVER_LETTER_KEY = "coverLetter";

        const EXISTING_PORTFOLIO_LINKS_KEY = "existingPortfolioLinks";

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
            if (!$apiRequest->HasOnlySpecifiedKeys(self::CLIENT_PROFILE_ID_KEY, self::COVER_LETTER_KEY, self::RESUME_KEY,
                    self::EXISTING_PORTFOLIO_LINKS_KEY)) {
                $apiRequest->EndRequest(HttpStatus::BAD_REQUEST, "Invalid parameter combination");
            }

            $clientProfileId = $apiRequest->GetKey(self::CLIENT_PROFILE_ID_KEY);
            $resumeData = $apiRequest->GetKey(self::RESUME_KEY);
            $coverLetterData = $apiRequest->GetKey(self::COVER_LETTER_KEY);
            $existingPortfolioLinks = $apiRequest->GetKey(self::EXISTING_PORTFOLIO_LINKS_KEY);
            // Authorize Session Key Owns Client Profile
            $authorizeSessionForClientResponse = AuthorizeSessionForClientProfile(GetBearerToken(), $clientProfileId);
            if ($authorizeSessionForClientResponse != Errors::SUCCESS) {
                $apiRequest->EndRequest(HttpStatus::UNAUTHORIZED, Errors::GetErrorMessage($authorizeSessionForClientResponse));
            }

            if ($resumeData == "" || $resumeData == null || $coverLetterData == "" || $coverLetterData == null) {
                $apiRequest->EndRequest(HttpStatus::BAD_REQUEST, "Resume/Cover letter null or empty");
            }

            $artistApplicationDal = new ArtistApplicationDal();
            if (!$artistApplicationDal->Initialize()) {
                $apiRequest->EndRequest(HttpStatus::INTERNAL_SERVER_ERROR, 'Database connection could not be initialized');
            }

            // Begin Transaction
            $artistApplicationDal->BeginTransaction();

            // Save Resume and Cover Letter
            $resumeUrl = UploadArtistApplicationResume($resumeData, $clientProfileId);
            if ($resumeUrl == null) {
                $artistApplicationDal->RollBackTransaction();
                $apiRequest->EndRequest(HttpStatus::INTERNAL_SERVER_ERROR, 'Failed to upload the resume');
            }

            $coverLetterUrl = UploadArtistApplicationCoverLetter($coverLetterData, $clientProfileId);
            if ($resumeUrl == null) {
                $artistApplicationDal->RollBackTransaction();
                $apiRequest->EndRequest(HttpStatus::INTERNAL_SERVER_ERROR, 'Failed to upload the cover letter');
            }

            // Create Application
            $createApplicationResponse = $artistApplicationDal->CreateArtistApplication($clientProfileId, $resumeUrl, $coverLetterUrl);
            if ($createApplicationResponse->Status != 0) {
                $artistApplicationDal->RollBackTransaction();
                $jsonResponse = $artistApplicationDal->EncodeResponse($createApplicationResponse);
                Log::LogInformation('ArtistApplication PUT Response: ' . $jsonResponse);
                echo $jsonResponse;
                $artistApplicationDal->Close();
                $apiRequest->EndRequest(HttpStatus::OK, 'Creating artist application failed');
            }

            // Add all links
            $newApplicationId = $createApplicationResponse->NewApplicationId;
            foreach($existingPortfolioLinks as $link) {
                $addExistingLinkResponse = $artistApplicationDal->AddExistingPortfolioLink($newApplicationId, $link);
                if ($addExistingLinkResponse->Status != 0) {
                    $artistApplicationDal->RollBackTransaction();
                    $jsonResponse = $artistApplicationDal->EncodeResponse($addExistingLinkResponse);
                    Log::LogInformation('ArtistApplication PUT Response: ' . $jsonResponse);
                    echo $jsonResponse;
                    $artistApplicationDal->Close();
                    $apiRequest->EndRequest(HttpStatus::OK, 'Adding portfolio link failed');
                }
            }

            // Commit transaction
            $artistApplicationDal->CommitTransaction();

            // Return status response
            $fullApiResponse = (object) ['status' => 0];
            $jsonResponse = $artistApplicationDal->EncodeResponse($fullApiResponse);
            Log::LogInformation('ArtistApplication PUT Response: ' . $jsonResponse);
            echo $jsonResponse;
            $artistApplicationDal->Close();
        }

        public function delete() {
            BadRequest(405);
        }

        public function options() {
            header('Allow: GET, OPTIONS');
        }
    }
?>