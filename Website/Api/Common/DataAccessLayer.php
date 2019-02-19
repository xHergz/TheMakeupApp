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

        public function EncodeResponse($response) {
            if (is_array($response)) {
                // Convert all keys with Some_Key case to someKey for javascript
                $convertedResponse = $this->ConvertArrayKeys($response);
                return json_encode($convertedResponse, JSON_NUMERIC_CHECK);
            }
            return $this->EncodeResponse(json_decode(json_encode($response), true));
        }

        private function ConvertArrayKeys($array) {
            // Convert all array keys to lower camelCase for nicer json output
            $newArray = array();
            foreach($array as $key => $value) {
                if (is_array($value)) {
                    $value = $this->ConvertArrayKeys($value);
                }
                $newKey = lcfirst(str_replace("_", "", $key));
                $newArray[$newKey] = $value;
            }
            return $newArray;
        }
    }
?>
