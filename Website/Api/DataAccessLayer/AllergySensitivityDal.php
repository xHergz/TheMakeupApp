<?php
    require_once __DIR__.'/../Common/DataAccessLayer.php';
    require_once __DIR__.'/Dto/AllergySensitivityDto.php';
    require_once __DIR__.'/Response/GetAllergiesAndSensitivitiesResponse.php';
    require_once __DIR__.'/Response/StatusResponse.php';

    define("AddCustomAllergySensitivity", "AddCustomAllergySensitivity");
    define("GetAllergiesAndSensitivities", "GetAllergiesAndSensitivities");

    class AllergySensitivityDal extends DataAccessLayer {
        public function AddCustomAllergySensitivity($clientProfileId, $description) {
            $parameterArray = array(
                new DatabaseParameter($clientProfileId, PDO::PARAM_INT, '_clientProfileId', ParameterDirection::IN),
                new DatabaseParameter($description, PDO::PARAM_STR, '_description', ParameterDirection::IN),
                new DatabaseParameter(Status, PDO::PARAM_STR, '_status', ParameterDirection::OUT)
            );
            $procResponse =  $this->_connectionInfo->ExecuteStoredProcedure(AddCustomAllergySensitivity, null, $parameterArray);
            return new StatusResponse($procResponse->Outputs[Status]);
        }

        public function GetAllergiesAndSensitivities($displayName) {
            $parameterArray = array(
                new DatabaseParameter($displayName, PDO::PARAM_STR, '_displayName', ParameterDirection::IN),
                new DatabaseParameter(Status, PDO::PARAM_STR, '_status', ParameterDirection::OUT)
            );
            $procResponse =  $this->_connectionInfo->ExecuteStoredProcedure(GetAllergiesAndSensitivities, 'AllergySensitivityDto', $parameterArray);
            return new GetAllergiesAndSensitivitiesResponse($procResponse->Outputs[Status], $procResponse->Results);
        }
    }
?>