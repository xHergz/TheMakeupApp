<?php
    require_once '../../private/Api/Common/ApiUtilities.php';
    require_once '../../private/Api/Common/Log.php';
    require_once '../../private/Api/Data/ApiRequest.php';
    require_once '../../private/Api/Data/Errors.php';
    require_once '../../private/Api/Data/HttpStatus.php';
    require_once '../../private/Api/DataAccessLayer/UserDal.php';
    require_once '../../private/Api/Endpoints/AllergySensitivityEndpoint.php';
    require_once '../../private/Api/Endpoints/ArtistApplicationEndpoint.php';
    require_once '../../private/Api/Endpoints/ArtistMakeoverOfferedEndpoint.php';
    require_once '../../private/Api/Endpoints/ArtistPortfolioEndpoint.php';
    require_once '../../private/Api/Endpoints/ArtistPortfolioPictureEndpoint.php';
    require_once '../../private/Api/Endpoints/ArtistQualificationEndpoint.php';
    require_once '../../private/Api/Endpoints/ArtistServiceAddonEndpoint.php';
    require_once '../../private/Api/Endpoints/ArtistServiceConsultationEndpoint.php';
    require_once '../../private/Api/Endpoints/ArtistServiceEndpoint.php';
    require_once '../../private/Api/Endpoints/ClientAllergySensitivityEndpoint.php';
    require_once '../../private/Api/Endpoints/ClientHeadshotEndpoint.php';
    require_once '../../private/Api/Endpoints/ClientProductPreferenceEndpoint.php';
    require_once '../../private/Api/Endpoints/ClientProfileEndpoint.php';
    require_once '../../private/Api/Endpoints/ClientReviewsEndpoint.php';
    require_once '../../private/Api/Endpoints/ConsultationTypeEndpoint.php';
    require_once '../../private/Api/Endpoints/EyeColoursEndpoint.php';
    require_once '../../private/Api/Endpoints/HairColoursEndpoint.php';
    require_once '../../private/Api/Endpoints/MakeoverAppointmentAddonEndpoint.php';
    require_once '../../private/Api/Endpoints/MakeoverAppointmentEndpoint.php';
    require_once '../../private/Api/Endpoints/MakeoverTypeEndpoint.php';
    require_once '../../private/Api/Endpoints/NotificationsEndpoint.php';
    require_once '../../private/Api/Endpoints/ProductPreferenceEndpoint.php';
    require_once '../../private/Api/Endpoints/SanitizationQuizEndpoint.php';
    require_once '../../private/Api/Endpoints/ServiceTypeEndpoint.php';
    require_once '../../private/Api/Endpoints/SessionEndpoint.php';
    require_once '../../private/Api/Endpoints/SkinTonesEndpoint.php';
    require_once '../../private/Api/Endpoints/UserEndpoint.php';
    require_once '../../private/Api/Helpers/AuthorizationMethods.php';

    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: Authorization, Content-Type');
    header('Access-Control-Allow-Methods: DELETE,GET,OPTION,POST,PUT');
    header('Content-type: application/json');

    // Register Endpoints
    $registeredEndpoints = [
        "allergy-sensitivity" => new AllergySensitivityEndpoint(),
        "artist-application" => new ArtistApplicationEndpoint(),
        "artist-makeover-offered" => new ArtistMakeoverOfferedEndpoint(),
        "artist-portfolio" => new ArtistPortfolioEndpoint(),
        "artist-portfolio-picture" => new ArtistPortfolioPictureEndpoint(),
        "artist-qualification" => new ArtistQualificationEndpoint(),
        "artist-service-addon" => new ArtistServiceAddonEndpoint(),
        "artist-service-consultation" => new ArtistServiceConsultationEndpoint(),
        "artist-service" => new ArtistServiceEndpoint(),
        "client-allergy-sensitivity" => new ClientAllergySensitivityEndpoint(),
        "client-headshot" => new ClientHeadshotEndpoint(),
        "client-product-preference" => new ClientProductPreferenceEndpoint(),
        "client-profile" => new ClientProfileEndpoint(),
        "client-reviews" => new ClientReviewsEndpoint(),
        "consultation-types" => new ConsultationTypeEndpoint(),
        "eye-colours" => new EyeColoursEndpoint(),
        "hair-colours" => new HairColoursEndpoint(),
        "makeover-appointment-addon" => new MakeoverAppointmentAddonEndpoint(),
        "makeover-appointment" => new MakeoverAppointmentEndpoint(),
        "makeover-types" => new MakeoverTypeEndpoint(),
        "notifications" => new NotificationsEndpoint(),
        "product-preference" => new ProductPreferenceEndpoint(),
        "sanitization-quiz" => new SanitizationQuizEndpoint(),
        "service-types" => new ServiceTypeEndpoint(),
        "session" => new SessionEndPoint(),
        "skin-tones" => new SkinTonesEndpoint(),
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