<?php
    require_once __DIR__.'/../Common/DataAccessLayer.php';
    require_once __DIR__.'/Dto/ClientHeadshotDto.php';
    require_once __DIR__.'/Response/GetClientHeadshotsResponse.php';
    require_once __DIR__.'/Response/StatusResponse.php';

    define("AddClientHeadshot", "AddClientHeadshot");
    define("GetClientHeadshots", "GetClientHeadshots");
    define("DeleteClientHeadshot", "DeleteClientHeadshot");

    class ClientHeadshotDal extends DataAccessLayer {
        public function AddClientHeadshot($clientProfileId, $headshotTypeId, $imagePath) {
            $parameterArray = array(
                new DatabaseParameter($clientProfileId, PDO::PARAM_INT, '_clientProfileId', ParameterDirection::IN),
                new DatabaseParameter($headshotTypeId, PDO::PARAM_INT, '_headshotTypeId', ParameterDirection::IN),
                new DatabaseParameter($imagePath, PDO::PARAM_STR, '_imagePath', ParameterDirection::IN),
                new DatabaseParameter(Status, PDO::PARAM_STR, '_status', ParameterDirection::OUT)
            );
            $procResponse =  $this->_connectionInfo->ExecuteStoredProcedure(AddClientHeadshot, null, $parameterArray);
            return new StatusResponse($procResponse->Outputs[Status]);
        }

        public function GetClientHeadshots($displayName) {
            $parameterArray = array(
                new DatabaseParameter($displayName, PDO::PARAM_STR, '_displayName', ParameterDirection::IN),
                new DatabaseParameter(Status, PDO::PARAM_STR, '_status', ParameterDirection::OUT)
            );
            $procResponse =  $this->_connectionInfo->ExecuteStoredProcedure(GetClientHeadshots, 'ClientHeadshotDto', $parameterArray);
            return new GetClientHeadshotsResponse($procResponse->Outputs[Status], $procResponse->Results);
        }

        public function DeleteClientHeadshot($clientHeadshotId) {
            $parameterArray = array(
                new DatabaseParameter($clientHeadshotId, PDO::PARAM_INT, '_clientHeadshotId', ParameterDirection::IN),
                new DatabaseParameter(Status, PDO::PARAM_STR, '_status', ParameterDirection::OUT)
            );
            $procResponse =  $this->_connectionInfo->ExecuteStoredProcedure(DeleteClientHeadshot, null, $parameterArray);
            return new StatusResponse($procResponse->Outputs[Status]);
        }
    }
?>
