<?php
    require_once __DIR__. "/../Common/ApiUtilities.php";
    require_once __DIR__. "/../Common/Log.php";
    require_once __DIR__. "/../Data/ApiRequest.php";
    require_once __DIR__. "/../Data/HttpStatus.php";
    require_once __DIR__. "/../DataAccessLayer/MakeoverAppointmentDal.php";
    require_once __DIR__. "/../Helpers/AuthorizationMethods.php";
    require_once 'IApiEndpoint.php';

    class MakeoverAppointmentEndpoint implements IApiEndpoint {
        const ADDONS_KEY = "addons";

        const APPOINTMENT_DATE_KEY = "appointmentDate";

        const ARTIST_PORTFOLIO_ID_KEY = "artistPortfolioId";

        const CLIENT_PROFILE_ID_KEY = "clientProfileId";

        const CONSULTATION_PRICE_KEY = "consultationPrice";

        const CONSULTATION_TYPE_ID_KEY = "consultationTypeId";

        const MAKEOVER_TYPE_ID_KEY = "makeoverTypeId";

        const SERVICE_PRICE_KEY = "servicePrice";

        const SERVICE_TYPE_ID_KEY = "serviceTypeId";

        public function get() {
            $apiRequest = new ApiRequest($_GET, 'MakeoverAppointment');
            $apiRequest->LogRequest();
            // This method only supports being called by unique id: ../makeover-appointment/makeoverAppointmentId=""
            if (!$apiRequest->IsForUniqueId()) {
                $apiRequest->EndRequest(HttpStatus::NOT_FOUND, 'Request is not for unique id');
            }

            $makeoverAppointmentId = $apiRequest->GetUniqueId();
            $authorizationResponse = AuthorizeSessionForMakeoverAppointment(GetBearerToken(), $makeoverAppointmentId);
            if ($authorizationResponse != Errors::SUCCESS) {
                $apiRequest->EndRequest(HttpStatus::UNAUTHORIZED, Errors::GetErrorMessage($authorizationResponse));
            }

            $makeoverAppointmentDal = new MakeoverAppointmentDal();
            if (!$makeoverAppointmentDal->Initialize()) {
                $apiRequest->EndRequest(HttpStatus::INTERNAL_SERVER_ERROR, 'Database connection could not be initialized');
            }

            $response = $makeoverAppointmentDal->GetMakeoverAppointment($makeoverAppointmentId);
            $jsonResponse = $makeoverAppointmentDal->EncodeResponse($response);
            Log::LogInformation('MakeoverAppointment GET Response: ' . $jsonResponse);
            echo $jsonResponse;
            $makeoverAppointmentDal->Close();
        }

        public function post() {
            BadRequest(405);
        }

        public function put() {
            $apiRequest = new ApiRequest(GetPutInput(), 'MakeoverAppointment');
            $apiRequest->LogRequest();

            // Make sure request has keys
            if (!$apiRequest->HasOnlySpecifiedKeys(self::CLIENT_PROFILE_ID_KEY, self::ARTIST_PORTFOLIO_ID_KEY, self::CONSULTATION_TYPE_ID_KEY,
                    self::CONSULTATION_PRICE_KEY, self::SERVICE_TYPE_ID_KEY, self::SERVICE_PRICE_KEY, self::MAKEOVER_TYPE_ID_KEY,
                    self::APPOINTMENT_DATE_KEY, self::ADDONS_KEY)) {
                $apiRequest->EndRequest(HttpStatus::BAD_REQUEST, "Invalid parameter combination");
            }

            $clientProfileId = $apiRequest->GetKey(self::CLIENT_PROFILE_ID_KEY);
            $artistPortfolioId = $apiRequest->GetKey(self::ARTIST_PORTFOLIO_ID_KEY);
            $consultationTypeId = $apiRequest->GetKey(self::CONSULTATION_TYPE_ID_KEY);
            $consultationPrice = $apiRequest->GetKey(self::CONSULTATION_PRICE_KEY);
            $serviceTypeId = $apiRequest->GetKey(self::SERVICE_TYPE_ID_KEY);
            $servicePrice = $apiRequest->GetKey(self::SERVICE_PRICE_KEY);
            $makeoverTypeId = $apiRequest->GetKey(self::MAKEOVER_TYPE_ID_KEY);
            $appointmentDate = $apiRequest->GetKey(self::APPOINTMENT_DATE_KEY);
            $addons = $apiRequest->GetKey(self::ADDONS_KEY);
            // Authorize Session Key Owns Client Profile
            $authorizeSessionForClientResponse = AuthorizeSessionForClientProfile(GetBearerToken(), $clientProfileId);
            if ($authorizeSessionForClientResponse != Errors::SUCCESS) {
                $apiRequest->EndRequest(HttpStatus::UNAUTHORIZED, Errors::GetErrorMessage($authorizeSessionForClientResponse));
            }

            $makeoverAppointmentDal = new MakeoverAppointmentDal();
            if (!$makeoverAppointmentDal->Initialize()) {
                $apiRequest->EndRequest(HttpStatus::INTERNAL_SERVER_ERROR, 'Database connection could not be initialized');
            }

            // Begin Transaction
            $makeoverAppointmentDal->BeginTransaction();

            // Create Appointment
            $createAppointmentResponse = $makeoverAppointmentDal->CreateMakeoverAppointment($clientProfileId, $artistPortfolioId,
                $makeoverTypeId, $serviceTypeId, $servicePrice, $consultationTypeId, $consultationPrice, $appointmentDate);
            if ($createAppointmentResponse->Status != 0) {
                $makeoverAppointmentDal->RollBackTransaction();
                $jsonResponse = $makeoverAppointmentDal->EncodeResponse($createApplicationResponse);
                Log::LogInformation('MakeoverAppointment PUT Response: ' . $jsonResponse);
                echo $jsonResponse;
                $makeoverAppointmentDal->Close();
                $apiRequest->EndRequest(HttpStatus::OK, 'Creating makeover appointment failed');
            }

            // Add all addons
            $newAppointmentId = $createAppointmentResponse->NewMakeoverAppointmentId;
            foreach($addons as $addon) {
                $addMakeoverAppointmentAddonResponse = $makeoverAppointmentDal->AddMakeoverAppointmentAddon($newAppointmentId,
                    $addon['description'], $addon['price']);
                if ($addMakeoverAppointmentAddonResponse->Status != 0) {
                    $makeoverAppointmentDal->RollBackTransaction();
                    $jsonResponse = $makeoverAppointmentDal->EncodeResponse($addMakeoverAppointmentAddonResponse);
                    Log::LogInformation('MakeoverAppointment PUT Response: ' . $jsonResponse);
                    echo $jsonResponse;
                    $makeoverAppointmentDal->Close();
                    $apiRequest->EndRequest(HttpStatus::OK, 'Adding appointment addon failed');
                }
            }

            // Commit transaction
            $makeoverAppointmentDal->CommitTransaction();

            // Return status response
            $fullApiResponse = (object) ['status' => 0];
            $jsonResponse = $makeoverAppointmentDal->EncodeResponse($fullApiResponse);
            Log::LogInformation('MakeoverAppointment PUT Response: ' . $jsonResponse);
            echo $jsonResponse;
            $makeoverAppointmentDal->Close();
        }

        public function delete() {
            BadRequest(405);
        }

        public function options() {
            header('Allow: GET, PUT, OPTIONS');
        }
    }
?>