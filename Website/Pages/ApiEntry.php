<?php
    require_once '../../private/Api/Common/ApiUtilities.php';
    require_once '../../private/Api/DataAccessLayer/UserDal.php';
    require_once '../../private/Api/EndPoints/SessionEndPoint.php';

    header('Access-Control-Allow-Origin: *');
    header('Content-type: application/json');

    // Register Endpoints
    $registeredEndpoints = [
        "session" => new SessionEndPoint(),
    ];

    $selectedEndpoint = null;
    if (isset($_GET['endpoint']) && array_key_exists($_GET['endpoint'], $registeredEndpoints)) {
        $selectedEndpoint = $registeredEndpoints[$_GET['endpoint']];
    }

    if ($selectedEndpoint == null) {
        BadRequest(404);
    }

    $userDal = new UserDal();
    $sessionKey = GetBearerToken();
    if ($sessionKey == null) {
        BadRequest(401);
    }
    
    if (!$userDal->Initialize()) {
        BadRequest(500);
    }

    if ($userDal->IsSessionKeyValid($sessionKey) != 0) {
        BadRequest(401);
    }

    switch($_SERVER['REQUEST_METHOD']) {
        case 'GET':
            $selectedEndpoint->get();
            break;
        case 'POST':
            $selectedEndpoint->post();
            break;
        case 'PUT':
            $selectedEndpoint->put();
            break;
        case 'DELETE':
            $selectedEndpoint->delete();
            break;
        default:
            BadRequest(501);
    }
?>