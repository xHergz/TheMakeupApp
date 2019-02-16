<?php 
    require_once __DIR__.'/DatabaseConnection.php';
    require_once __DIR__.'/DatabaseParameter.php';

    class DataAccessLayer {
        protected $_connectionInfo;
        
        public $IsConnected;
        
        public function __construct(){
            $this->_connectionInfo = new DatabaseConnection();
            $this->IsConnected = false;
        }
        
        // Initialize the connection to the database
        public function Initialize(){
            $this->IsConnected = $this->_connectionInfo->Initialize();
            return $this->IsConnected;
        }

        // Close the connection to the database
        public function Close(){
            $this->_connectionInfo->Close();
        }

        // Get a general error database response object
        public function GetDatabaseError() {
            return $this->_connectionInfo->CreateDatabaseErrorResponse();
        }

        // Get a parameter error database response object
        public function GetParameterError() {
            return $this->_connectionInfo->CreateParameterErrorResponse();
        }

        public function EncodeResponse($response) {
            if (is_array($response)) {
                // Convert all keys with Some_Key case to someKey for javascript
                $newArray = array();
                foreach($response as $key => $value) {
                    $newKey = lcfirst(str_replace("_", "", $key));
                    $newArray[$newKey] = $value;
                }
                return json_encode($newArray, JSON_NUMERIC_CHECK);
            }
            return json_encode($response, JSON_NUMERIC_CHECK);
        }
    }
?>
