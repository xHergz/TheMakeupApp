<?php
    require_once __DIR__. "/../Common/ApiUtilities.php";
    require_once __DIR__. "/../Common/Log.php";
    require_once __DIR__. "/../Data/ApiRequest.php";
    require_once __DIR__. "/../Data/HttpStatus.php";
    require_once __DIR__. "/../Data/User.php";
    require_once __DIR__. "/../DataAccessLayer/UserDal.php";
    require_once __DIR__. "/../Helpers/AuthorizationMethods.php";
    require_once 'IApiEndpoint.php';

    class UserEndPoint implements IApiEndpoint {
        const EMAIL_KEY = 'email';

        const PASSWORD_KEY = 'password';

        const CONFIRM_PASSWORD_KEY = 'confirmPassword';

        const DISPLAY_NAME_KEY = 'displayName';

        const FIRST_NAME_KEY = 'firstName';

        const LAST_NAME_KEY = 'lastName';

        public function get() {
            $apiRequest = new ApiRequest($_GET, 'User');
            // This method only supports being called by displayname: ../user?displayName=""
            if ($apiRequest->IsEmpty()) {
                $apiRequest->EndRequest(HttpStatus::NOT_FOUND, 'Request is empty');
            }
            else if ($apiRequest->IsForUniqueId()) {
                $apiRequest->EndRequest(HttpStatus::NOT_FOUND, 'Request is for unique id');
            }
            else if ($apiRequest->NumberOfParameters() > 1) {
                $apiRequest->EndRequest(HttpStatus::NOT_FOUND, 'Request has more than 1 parameters');
            }

            // Check if session key is authorized to get information for user
            if ($apiRequest->IsKeySet(self::DISPLAY_NAME_KEY)) {
                $authorizationStatus = $this->IsSessionAuthorizedForDisplayName($apiRequest->GetKey(self::DISPLAY_NAME_KEY));
                if ($authorizationStatus != HttpStatus::OK) {
                    $apiRequest->EndRequest($authorizationStatus, 'Authorization failed');
                }
            }
            else {
                $apiRequest->EndRequest(HttpStatus::NOT_FOUND, 'Display Name not set');
            }

            $userDal = new UserDal();
            if (!$userDal->Initialize()) {
                $apiRequest->EndRequest(HttpStatus::INTERNAL_SERVER_ERROR, 'Database connection could not be initialized');
            }

            $apiRequest->LogRequest();
            $response = null;
            // Check the combinations of parameters
            if ($apiRequest->HasOnlySpecifiedKeys(self::DISPLAY_NAME_KEY)) {
                $displayName = $apiRequest->GetKey(self::DISPLAY_NAME_KEY);
                $response = $userDal->GetUser($displayName);
            }
            else {
                $userDal->Close();
                $apiRequest->EndRequest(HttpStatus::NOT_FOUND, 'Unknown combination of parameters');
            }

            $jsonResponse = $userDal->EncodeResponse($response);
            Log::LogInformation('User GET Response: ' . $jsonResponse);
            echo $jsonResponse;
            $userDal->Close();
        }

        public function post() {
            $apiRequest = new ApiRequest($_POST, 'User');
            // This method only supports being called by unique id: ../user/(user_id)
            if (!$apiRequest->IsForUniqueId()) {
                $apiRequest->EndRequest(HttpStatus::NOT_FOUND, 'Request is not for unique id');
            }

            // Check if session key is authorized to get information for user
            $authorizationStatus = $this->IsSessionAuthorizedForUserId($apiRequest->GetUniqueId());
            if ($authorizationStatus != HttpStatus::OK) {
                $apiRequest->EndRequest($authorizationStatus, 'Authorization failed');
            }

            $userDal = new UserDal();
            if (!$userDal->Initialize()) {
                $apiRequest->EndRequest(HttpStatus::INTERNAL_SERVER_ERROR, 'Database connection could not be initialized');
            }

            $apiRequest->LogRequest();
            $response = null;
            // Check the combinations of parameters
            if ($apiRequest->HasOnlySpecifiedKeys(self::EMAIL_KEY, self::PASSWORD_KEY, self::CONFIRM_PASSWORD_KEY, self::DISPLAY_NAME_KEY, 
                    self::FIRST_NAME_KEY, self::LAST_NAME_KEY)) {
                $email = $apiRequest->GetKey(self::EMAIL_KEY);
                $password = $apiRequest->GetKey(self::PASSWORD_KEY);
                $confirmPassword = $apiRequest->GetKey(self::CONFIRM_PASSWORD_KEY);
                $displayName = $apiRequest->GetKey(self::DISPLAY_NAME_KEY);
                $firstName = $apiRequest->GetKey(self::FIRST_NAME_KEY);
                $lastName = $apiRequest->GetKey(self::LAST_NAME_KEY);
                $user = new User();
                $user->SetInfo($email, $password, $confirmPassword, $displayName, $firstName, $lastName);

                // Validate User Information
                if (!empty($user->GetUpdateErrors())) {
                    $apiRequest->EndRequest(HttpStatus::BAD_REQUEST, 'Invalid Parameters: ' . implode(', ', $user->GetUpdateErrors()));
                }
                $passwordHash = $user->Password == null ? null : password_hash($user->Password, PASSWORD_DEFAULT);
                $response = $userDal->UpdateUser(GetBearerToken(), $apiRequest->GetUniqueId(), $user->Email, $passwordHash, $user->DisplayName,
                    $user->FirstName, $user->LastName);
            }
            else {
                $userDal->Close();
                $apiRequest->EndRequest(HttpStatus::NOT_FOUND, 'Unknown combination of parameters');
            }
            
            $jsonResponse = $userDal->EncodeResponse($response);
            Log::LogInformation('User POST Response: ' . $jsonResponse);
            echo $jsonResponse;
            $userDal->Close();
        }

        public function put() {
            BadRequest(405);
        }

        public function delete() {
            $apiRequest = new ApiRequest($_GET, 'User');
            // This method only supports being called by unique id: ../user/(user_id)
            if (!$apiRequest->IsForUniqueId()) {
                $apiRequest->EndRequest(HttpStatus::NOT_FOUND, 'Request is not for unique id');
            }

            // Check if session key is authorized to get information for user
            $authorizationStatus = $this->IsSessionAuthorizedForUserId($apiRequest->GetUniqueId());
            if ($authorizationStatus != HttpStatus::OK) {
                $apiRequest->EndRequest($authorizationStatus, 'Authorization failed');
            }

            $userDal = new UserDal();
            if (!$userDal->Initialize()) {
                $apiRequest->EndRequest(HttpStatus::INTERNAL_SERVER_ERROR, 'Database connection could not be initialized');
            }

            $apiRequest->LogRequest();
            $response = null;
            // Check the combinations of parameters
            if ($apiRequest->IsEmpty()) {
                $response = $userDal->DeactivateUser(GetBearerToken(), $apiRequest->GetUniqueId());
            }
            else {
                $userDal->Close();
                $apiRequest->EndRequest(HttpStatus::NOT_FOUND, 'Unknown combination of parameters');
            }
            
            $jsonResponse = $userDal->EncodeResponse($response);
            Log::LogInformation('User DELETE Response: ' . $jsonResponse);
            echo $jsonResponse;
            $userDal->Close();
        }

        public function options() {
            header('Allow: GET, POST, DELETE, OPTIONS');
        }

        private function IsSessionAuthorizedForDisplayName($displayName) {
            $doesSessionOwnUserResponse = AuthorizeSessionForDisplayName(GetBearerToken(), $displayName);
            if ($doesSessionOwnUserResponse != Errors::SUCCESS) {
                switch ($doesSessionOwnUserResponse) {
                    case Errors::DISPLAY_NAME_DOES_NOT_EXIST:
                        return HttpStatus::NOT_FOUND;
                    case Errors::USER_DOES_NOT_BELONG_TO_SESSION:
                        return HttpStatus::UNAUTHORIZED;
                    default:
                        return HttpStatus::INTERNAL_SERVER_ERROR;
                }
            }
            return HttpStatus::OK;
        }

        private function IsSessionAuthorizedForUserId($userId) {
            $doesSessionOwnUserResponse = AuthorizeSessionForUser(GetBearerToken(), $userId);
            if ($doesSessionOwnUserResponse != Errors::SUCCESS) {
                switch ($doesSessionOwnUserResponse) {
                    case Errors::USER_DOES_NOT_BELONG_TO_SESSION:
                        return HttpStatus::UNAUTHORIZED;
                    default:
                        return HttpStatus::INTERNAL_SERVER_ERROR;
                }
            }
            return HttpStatus::OK;
        }
    }
?>