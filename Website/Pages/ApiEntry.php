<?php
    require_once '../../private/Api/Common/ApiUtilities.php';
    require_once '../../private/Api/Common/Log.php';
    require_once '../../private/Api/Data/ApiRequest.php';
    require_once '../../private/Api/Data/Errors.php';
    require_once '../../private/Api/Data/HttpStatus.php';
    require_once '../../private/Api/DataAccessLayer/UserDal.php';
    require_once '../../private/Api/Endpoints/NotificationsEndPoint.php';
    require_once '../../private/Api/Endpoints/SessionEndPoint.php';
    require_once '../../private/Api/Endpoints/UserEndPoint.php';
    require_once '../../private/Api/Helpers/AuthorizationMethods.php';

    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: Authorization, Content-Type');
    header('Access-Control-Allow-Methods: DELETE,GET,OPTION,POST,PUT');
    header('Content-type: application/json');

    // Register Endpoints
    $registeredEndpoints = [
        "notifications" => new NotificationsEndpoint(),
        "session" => new SessionEndPoint(),
        "user" => new UserEndPoint()
    ];
    
    $apiRequest = new ApiRequest($_GET, 'API Entry');

    // Check if the endpoint parameter is set
    if ($apiRequest->GetEndpoint() == null) {
        $apiRequest->EndRequest(HttpStatus::NOT_FOUND, '\'endpoint\' was not set.');
    }

    // Check if the endpoint exists
    if (!array_key_exists($apiRequest->GetEndpoint(), $registeredEndpoints)) {
        $apiRequest->EndRequest(HttpStatus::NOT_FOUND, '\'' . $apiRequest->GetEndpoint() . '\' is not a registered endpoint.');
    }
    
    $selectedEndpoint = $registeredEndpoints[$apiRequest->GetEndpoint()];
    $sessionKey = GetBearerToken();
    Log::LogInformation('API Endpoint \''. $apiRequest->GetEndpoint() .'\' called with session key: ' . $sessionKey);

    switch($apiRequest->GetHttpMethod()) {
        case 'GET':
            AuthorizeApiUser($sessionKey);
            $selectedEndpoint->get();
            break;
        case 'POST':
            AuthorizeApiUser($sessionKey);
            $_POST = empty($_POST) ? GetJsonInput() : $_POST;
            $selectedEndpoint->post();
            break;
        case 'PUT':
            AuthorizeApiUser($sessionKey);
            $selectedEndpoint->put();
            break;
        case 'DELETE':
            AuthorizeApiUser($sessionKey);
            $selectedEndpoint->delete();
            break;
        case 'OPTIONS': {
            $selectedEndpoint->options();
            break;
        }
        default:
            $apiRequest->EndRequest(HttpStatus::NOT_IMPLEMENTED, 'HTTP Method \'' . $apiRequest->GetHttpMethod() . '\' is not supported.');
    }

    function AuthorizeApiUser($sessionKey) {
        $authorizeSessionResponse = AuthorizeSession($sessionKey);
        if ($authorizeSessionResponse != Errors::SUCCESS) {
            switch($authorizeSessionResponse) {
                case Errors::NO_SESSION_KEY:
                case Errors::INVALID_SESSION_KEY:
                    $httpStatus = HttpStatus::UNAUTHORIZED;
                    break;
                default:
                    $httpStatus = HttpStatus::INTERNAL_SERVER_ERROR;
            }
            Log::LogError('(' . $httpStatus . ') API Request Failed: ' . Errors::GetErrorMessage($authorizeSessionResponse));
            BadRequest($httpStatus);
        }
    }
?>