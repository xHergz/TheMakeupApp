<?php
    require_once __DIR__. "/../Common/ApiUtilities.php";
    require_once __DIR__. "/../Common/Log.php";
    require_once __DIR__. "/../Data/ApiRequest.php";
    require_once __DIR__. "/../Data/HttpStatus.php";
    require_once __DIR__. "/../DataAccessLayer/MakeoverAppointmentDal.php";
    require_once __DIR__. "/../Helpers/AuthorizationMethods.php";
    require_once 'IApiEndpoint.php';

    class MakeoverAppointmentAddonEndpoint implements IApiEndpoint {
        const MAKEOVER_APPOINTMENT_ID_KEY = "makeoverAppointmentId";

        public function get() {
            $apiRequest = new ApiRequest($_GET, 'MakeoverAppointmentAddon');
            $apiRequest->LogRequest();
            // This method only supports being called by makeoverAppointmentId: ../makeover-appointment-addon?makeoverAppointmentId=""
            if (!$apiRequest->HasOnlySpecifiedKeys(self::MAKEOVER_APPOINTMENT_ID_KEY)) {
                $apiRequest->EndRequest(HttpStatus::NOT_FOUND, 'Request is not makeover appointment id');
            }

            $makeoverAppointmentId = $apiRequest->GetKey(self::MAKEOVER_APPOINTMENT_ID_KEY);
            $authorizationResponse = AuthorizeSessionForMakeoverAppointment(GetBearerToken(), $makeoverAppointmentId);
            if ($authorizationResponse != Errors::SUCCESS) {
                $apiRequest->EndRequest(HttpStatus::UNAUTHORIZED, Errors::GetErrorMessage($authorizationResponse));
            }

            $makeoverAppointmentDal = new MakeoverAppointmentDal();
            if (!$makeoverAppointmentDal->Initialize()) {
                $apiRequest->EndRequest(HttpStatus::INTERNAL_SERVER_ERROR, 'Database connection could not be initialized');
            }

            $response = $makeoverAppointmentDal->GetMakeoverAppointmentAddons($makeoverAppointmentId);
            $jsonResponse = $makeoverAppointmentDal->EncodeResponse($response);
            Log::LogInformation('MakeoverAppointmentAddon GET Response: ' . $jsonResponse);
            echo $jsonResponse;
            $makeoverAppointmentDal->Close();
        }

        public function post() {
            BadRequest(405);
        }

        public function put() {
            BadRequest(405);
        }

        public function delete() {
            BadRequest(405);
        }

        public function options() {
            header('Allow: GET, OPTIONS');
        }
    }
?>