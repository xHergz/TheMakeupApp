<?php
    require_once __DIR__.'/../Common/DataAccessLayer.php';
    require_once __DIR__.'/Dto/ProductPreference.php';
    require_once __DIR__.'/Response/GetProductPreferencesResponse.php';
    require_once __DIR__.'/Response/StatusResponse.php';

    define("AddCustomProductPreference", "AddCustomProductPreference");
    define("GetProductPreferences", "GetProductPreferences");

    class ProductPreferenceDal extends DataAccessLayer {
        public function AddCustomProductPreference($clientProfileId, $description) {
            $parameterArray = array(
                new DatabaseParameter($clientProfileId, PDO::PARAM_INT, '_clientProfileId', ParameterDirection::IN),
                new DatabaseParameter($description, PDO::PARAM_STR, '_description', ParameterDirection::IN),
                new DatabaseParameter(Status, PDO::PARAM_STR, '_status', ParameterDirection::OUT)
            );
            $procResponse =  $this->_connectionInfo->ExecuteStoredProcedure(AddCustomProductPreference, null, $parameterArray);
            return new StatusResponse($procResponse->Outputs[Status]);
        }

        public function GetProductPreferences($displayName) {
            $parameterArray = array(
                new DatabaseParameter($displayName, PDO::PARAM_STR, '_displayName', ParameterDirection::IN),
                new DatabaseParameter(Status, PDO::PARAM_STR, '_status', ParameterDirection::OUT)
            );
            $procResponse =  $this->_connectionInfo->ExecuteStoredProcedure(GetProductPreferences, 'ProductPreference', $parameterArray);
            return new GetProductPreferencesResponse($procResponse->Outputs[Status], $procResponse->Results);
        }
    }
?>
