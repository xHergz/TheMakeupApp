<?php
    require_once __DIR__.'/../Common/DataAccessLayer.php';
    require_once __DIR__.'/Dto/ClientProductPreferenceDto.php';
    require_once __DIR__.'/Response/GetClientProductPreferencesResponse.php';
    require_once __DIR__.'/Response/StatusResponse.php';

    define("AddClientProductPreference", "AddClientProductPreference");
    define("GetClientProductPreferences", "GetClientProductPreferences");
    define("DeleteClientProductPreferences", "DeleteClientProductPreferences");

    class ClientProductPreferenceDal extends DataAccessLayer {
        public function AddClientProductPreference($clientProfileId, $productPreferenceId) {
            $parameterArray = array(
                new DatabaseParameter($clientProfileId, PDO::PARAM_INT, '_clientProfileId', ParameterDirection::IN),
                new DatabaseParameter($productPreferenceId, PDO::PARAM_INT, '_productPreferenceId', ParameterDirection::IN),
                new DatabaseParameter(Status, PDO::PARAM_STR, '_status', ParameterDirection::OUT)
            );
            $procResponse =  $this->_connectionInfo->ExecuteStoredProcedure(AddClientProductPreference, null, $parameterArray);
            return new StatusResponse($procResponse->Outputs[Status]);
        }

        public function GetClientProductPreferences($displayName) {
            $parameterArray = array(
                new DatabaseParameter($displayName, PDO::PARAM_STR, '_displayName', ParameterDirection::IN),
                new DatabaseParameter(Status, PDO::PARAM_STR, '_status', ParameterDirection::OUT)
            );
            $procResponse =  $this->_connectionInfo->ExecuteStoredProcedure(GetClientProductPreferences, 'ClientProductPreferenceDto', $parameterArray);
            return new GetClientProductPreferencesResponse($procResponse->Outputs[Status], $procResponse->Results);
        }

        public function DeleteClientProductPreferences($clientProfileId, $productPreferenceId) {
            $parameterArray = array(
                new DatabaseParameter($clientProfileId, PDO::PARAM_INT, '_clientProfileId', ParameterDirection::IN),
                new DatabaseParameter($productPreferenceId, PDO::PARAM_INT, '_productPreferenceId', ParameterDirection::IN),
                new DatabaseParameter(Status, PDO::PARAM_STR, '_status', ParameterDirection::OUT)
            );
            $procResponse =  $this->_connectionInfo->ExecuteStoredProcedure(DeleteClientProductPreferences, null, $parameterArray);
            return new StatusResponse($procResponse->Outputs[Status]);
        }
    }
?>
