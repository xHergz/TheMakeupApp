<?php
    require_once '../../private/Api/Common/ApiUtilities.php';
    require_once '../../private/Api/Common/Log.php';

    define("EndpointKey", "endpoint");
    define("UniqueIdKey", "uid");

    class ApiRequest {
        private $_apiRequest;

        private $_endpoint;

        private $_httpMethod;

        private $_queryString;

        private $_identifier;

        public function __construct($request, $identifier) {
            $this->_apiRequest = $request;
            $this->_endpoint = $this->GetKey(EndpointKey);
            $this->_httpMethod = $_SERVER['REQUEST_METHOD'];
            $this->_queryString = $_SERVER['QUERY_STRING'];
            $this->_identifier = $identifier;
            $this->RemoveKey(EndpointKey);
            Log::LogInformation($this->_identifier . ' \'' . $this->_httpMethod . '\' Request made with query string: ' . $this->_queryString);
        }

        public function IsKeySet($key) {
            return isset($this->_apiRequest[$key]);
        }

        public function GetKey($key) {
            if (!$this->IsKeySet($key)) {
                return null;
            }
            return $this->_apiRequest[$key];
        }

        public function IsEmpty() {
            return empty($this->_apiRequest);
        }

        public function NumberOfParameters() {
            return count($this->_apiRequest);
        }

        public function IsForUniqueId() {
            return $this->IsKeySet(UniqueIdKey) && $this->NumberOfParameters() == 1;
        }

        public function GetUniqueId() {
            return $this->GetKey(UniqueIdKey);
        }

        public function GetEndpoint() {
            return $this->_endpoint;
        }

        public function GetHttpMethod() {
            return $this->_httpMethod;
        }

        public function GetQueryString() {
            return $this->_queryString;
        }

        public function EndRequest($status, $reason) {
            Log::LogError('(' . $status . ') ' . $this->_identifier . ' Request failed: ' . $reason);
            BadRequest($status);
        }

        public function HasOnlySpecifiedKeys(...$keys) {
            if ($this->NumberOfParameters() != count($keys)) {
                return false;
            }
            foreach ($keys as $key) {
                if (!$this->IsKeySet($key)) {
                    return false;
                }
            }
            return true;
        }

        public function LogRequest() {
            $parameterString = '';
            foreach ($this->_apiRequest as $paramKey => $paramValue) {
                if ($parameterString != '') {
                    $parameterString .= ', ';
                }
                $parameterString .= "{$paramKey}: '{$paramValue}'";
            }
            Log::LogInformation("{$this->_identifier} {$this->_httpMethod} Request with {$parameterString}");
        }

        private function RemoveKey($key) {
            if ($this->IsKeySet($key)) {
                unset($this->_apiRequest[$key]);
            }
        }
    }
?>