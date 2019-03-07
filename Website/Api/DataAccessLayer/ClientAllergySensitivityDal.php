<?php
    require_once __DIR__.'/../Common/DataAccessLayer.php';
    require_once __DIR__.'/Dto/ClientAllergySensitivityDto.php';
    require_once __DIR__.'/Response/GetClientAllergiesAndSensitivitiesResponse.php';
    require_once __DIR__.'/Response/StatusResponse.php';

    define("AddClientAllergySensitivity", "AddClientAllergySensitivity");
    define("GetClientAllergiesAndSensitivities", "GetClientAllergiesAndSensitivities");
    define("DeleteClientAllergySensitivity", "DeleteClientAllergySensitivity");

    class ClientAllergySensitivityDal extends DataAccessLayer {
        public function AddClientAllergySensitivity($clientProfileId, $allergySensitivityId) {
            $parameterArray = array(
                new DatabaseParameter($clientProfileId, PDO::PARAM_INT, '_clientProfileId', ParameterDirection::IN),
                new DatabaseParameter($allergySensitivityId, PDO::PARAM_INT, '_allergySensitivityId', ParameterDirection::IN),
                new DatabaseParameter(Status, PDO::PARAM_STR, '_status', ParameterDirection::OUT)
            );
            $procResponse =  $this->_connectionInfo->ExecuteStoredProcedure(AddClientAllergySensitivity, null, $parameterArray);
            return new StatusResponse($procResponse->Outputs[Status]);
        }

        public function GetClientAllergiesAndSensitivities($displayName) {
            $parameterArray = array(
                new DatabaseParameter($displayName, PDO::PARAM_STR, '_displayName', ParameterDirection::IN),
                new DatabaseParameter(Status, PDO::PARAM_STR, '_status', ParameterDirection::OUT)
            );
            $procResponse =  $this->_connectionInfo->ExecuteStoredProcedure(GetClientAllergiesAndSensitivities, 'ClientAllergySensitivityDto', $parameterArray);
            return new GetClientAllergiesAndSensitivitiesResponse($procResponse->Outputs[Status], $procResponse->Results);
        }

        public function DeleteClientAllergySensitivity($clientProfileId, $allergySensitivityId) {
            $parameterArray = array(
                new DatabaseParameter($clientProfileId, PDO::PARAM_INT, '_clientProfileId', ParameterDirection::IN),
                new DatabaseParameter($allergySensitivityId, PDO::PARAM_INT, '_allergySensitivityId', ParameterDirection::IN),
                new DatabaseParameter(Status, PDO::PARAM_STR, '_status', ParameterDirection::OUT)
            );
            $procResponse =  $this->_connectionInfo->ExecuteStoredProcedure(DeleteClientAllergySensitivity, null, $parameterArray);
            return new StatusResponse($procResponse->Outputs[Status]);
        }
    }
?>
