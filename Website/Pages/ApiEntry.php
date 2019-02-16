<?php
    require_once '../../private/Api/Common/ApiUtilities.php';
    require_once '../../private/Api/Common/Log.php';
    require_once '../../private/Api/Data/Errors.php';
    require_once '../../private/Api/Data/HttpStatus.php';
    require_once '../../private/Api/DataAccessLayer/UserDal.php';
    require_once '../../private/Api/Endpoints/SessionEndPoint.php';
    require_once '../../private/Api/Helpers/UserMethods.php';

    header('Access-Control-Allow-Origin: *');
    //header('Access-Control-Allow-Methods: GET,POST,PUT,DELETE,OPTIONS');
    header('Access-Control-Allow-Headers: Authorization, Content-Type');
    header('Content-type: application/json');

    // Register Endpoints
    $registeredEndpoints = [
        "session" => new SessionEndPoint(),
    ];
    
    $queryString = $_SERVER['QUERY_STRING'];
    $httpMethod = $_SERVER['REQUEST_METHOD'];
    Log::LogInformation('API \'' . $httpMethod . '\' Request made with query string: ' . $queryString);

    // Check if the endpoint parameter is set
    if (!isset($_GET['endpoint'])) {
        Log::LogError('(404) API Request failed because \'endpoint\' was not set.');
        BadRequest(404);
    }

    $requestedEndpoint = $_GET['endpoint'];

    // Check if the endpoint exists
    if (!array_key_exists($_GET['endpoint'], $registeredEndpoints)) {
        Log::LogError('(404) API Request failed because ' . $requestedEndpoint . ' is not a registered endpoint.');
        BadRequest(404);
    }
    
    $selectedEndpoint = $registeredEndpoints[$requestedEndpoint];
    $sessionKey = GetBearerToken();
    Log::LogInformation('API Endpoint \''. $requestedEndpoint .'\' called with session key: ' . $sessionKey);

    switch($httpMethod) {
        case 'GET':
            AuthorizeApiUser($sessionKey);
            $selectedEndpoint->get();
            break;
        case 'POST':
            AuthorizeApiUser($sessionKey);
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
            Log::LogError('(501) API Request failed because HTTP Method \'' . $httpMethod . '\' is not supported.');
            BadRequest(501);
    }

    function AuthorizeApiUser($sessionKey) {
        $authorizeUserResponse = AuthorizeUser($sessionKey);
        if ($authorizeUserResponse != Errors::SUCCESS) {
            switch($authorizeUserResponse) {
                case Errors::NO_SESSION_KEY:
                case Errors::INVALID_SESSION_KEY:
                    $httpStatus = HttpStatus::NOT_AUTHORIZED;
                    break;
                default:
                    $httpStatus = HttpStatus::INTERNAL_SERVER_ERROR;
            }
            Log::LogError('(' . $httpStatus . ') API Request Failed: ' . Errors::GetErrorMessage($authorizeUserResponse));
            BadRequest($httpStatus);
        }
    }
?>