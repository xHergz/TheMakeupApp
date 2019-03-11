<?php
    require_once __DIR__.'/../Common/DataAccessLayer.php';
    require_once __DIR__.'/Dto/ArtistServiceDto.php';
    require_once __DIR__.'/Dto/ServiceTypeDto.php';
    require_once __DIR__.'/Response/GetArtistServicesResponse.php';
    require_once __DIR__.'/Response/GetServiceTypesResponse.php';
    require_once __DIR__.'/Response/StatusResponse.php';

    define("AddArtistService", "AddArtistService");
    define("DeleteArtistService", "DeleteArtistService");
    define("GetArtistServices", "GetArtistServices");
    define("GetServiceTypes", "GetServiceTypes");

    class ArtistServiceConsultationDal extends DataAccessLayer {
        public function AddArtistService($artistMakeoverOfferedId, $serviceTypeId, $basePrice) {
            $parameterArray = array(
                new DatabaseParameter($artistMakeoverOfferedId, PDO::PARAM_INT, '_artistMakeoverOfferedId', ParameterDirection::IN),
                new DatabaseParameter($serviceTypeId, PDO::PARAM_INT, '_serviceTypeId', ParameterDirection::IN),
                new DatabaseParameter($basePrice, PDO::PARAM_INT, '_basePrice', ParameterDirection::IN),
                new DatabaseParameter(Status, PDO::PARAM_STR, '_status', ParameterDirection::OUT)
            );
            $procResponse =  $this->_connectionInfo->ExecuteStoredProcedure(AddArtistService, null, $parameterArray);
            return new StatusResponse($procResponse->Outputs[Status]);
        }

        public function DeleteArtistService($artistServiceId) {
            $parameterArray = array(
                new DatabaseParameter($artistServiceId, PDO::PARAM_INT, '_artistServiceId', ParameterDirection::IN),
                new DatabaseParameter(Status, PDO::PARAM_STR, '_status', ParameterDirection::OUT)
            );
            $procResponse =  $this->_connectionInfo->ExecuteStoredProcedure(DeleteArtistService, null, $parameterArray);
            return new StatusResponse($procResponse->Outputs[Status]);
        }

        public function GetArtistServices($displayName) {
            $parameterArray = array(
                new DatabaseParameter($displayName, PDO::PARAM_STR, '_displayName', ParameterDirection::IN),
                new DatabaseParameter(Status, PDO::PARAM_STR, '_status', ParameterDirection::OUT)
            );
            $procResponse =  $this->_connectionInfo->ExecuteStoredProcedure(GetArtistServices, 'ArtistServiceDto', $parameterArray);
            return new GetArtistServicesResponse($procResponse->Outputs[Status], $procResponse->Results);
        }

        public function GetServiceTypes() {
            $parameterArray = array(
                new DatabaseParameter(Status, PDO::PARAM_STR, '_status', ParameterDirection::OUT)
            );
            $procResponse =  $this->_connectionInfo->ExecuteStoredProcedure(GetServiceTypes, 'ServiceTypeDto', $parameterArray);
            return new GetServiceTypesResponse($procResponse->Outputs[Status], $procResponse->Results);
        }
    }
?>
