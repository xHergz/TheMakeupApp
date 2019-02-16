<?php
    require_once '../../private/Api/Common/ApiUtilities.php';
    require_once '../../private/Api/Common/Log.php';
    require_once '../../private/Api/DataAccessLayer/UserDal.php';
    require_once '../../private/Api/EndPoints/SessionEndPoint.php';

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
            AuthorizeUser($sessionKey);
            $selectedEndpoint->get();
            break;
        case 'POST':
            AuthorizeUser($sessionKey);
            $selectedEndpoint->post();
            break;
        case 'PUT':
            AuthorizeUser($sessionKey);
            $selectedEndpoint->put();
            break;
        case 'DELETE':
            AuthorizeUser($sessionKey);
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

    function AuthorizeUser($sessionKey) {
        if ($sessionKey == null) {
            Log::LogError('(401) API Request failed because session key is null.');
            BadRequest(401);
        }

        $userDal = new UserDal();
        if (!$userDal->Initialize()) {
            Log::LogError('(500) API Request failed because database connection could not be initialized.');
            $userDal->Close();
            BadRequest(500);
        }

        if ($userDal->IsSessionKeyValid($sessionKey) != 0) {
            Log::LogError('(401) API Request failed because session key \'' . $sessionKey . '\' is invalid.');
            $userDal->Close();
            BadRequest(401);
        }
        $userDal->Close();
    }
?>