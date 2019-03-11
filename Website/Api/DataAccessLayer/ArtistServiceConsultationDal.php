<?php
    require_once __DIR__.'/../Common/DataAccessLayer.php';
    require_once __DIR__.'/Dto/ArtistServiceConsultationDto.php';
    require_once __DIR__.'/Dto/ConsultationTypeDto.php';
    require_once __DIR__.'/Response/GetArtistServiceConsultationsResponse.php';
    require_once __DIR__.'/Response/GetConsultationTypesResponse.php';
    require_once __DIR__.'/Response/StatusResponse.php';

    define("AddArtistServiceConsultation", "AddArtistServiceConsultation");
    define("DeleteArtistServiceConsultation", "DeleteArtistServiceConsultation");
    define("GetArtistServiceConsultations", "GetArtistServiceConsultations");
    define("GetConsultationTypes", "GetConsultationTypes");

    class ArtistServiceConsultationDal extends DataAccessLayer {
        public function AddArtistServiceConsultation($artistServiceId, $consultationTypeId, $price) {
            $parameterArray = array(
                new DatabaseParameter($artistServiceId, PDO::PARAM_INT, '_artistServiceId', ParameterDirection::IN),
                new DatabaseParameter($consultationTypeId, PDO::PARAM_INT, '_consultationTypeId', ParameterDirection::IN),
                new DatabaseParameter($price, PDO::PARAM_INT, '_price', ParameterDirection::IN),
                new DatabaseParameter(Status, PDO::PARAM_STR, '_status', ParameterDirection::OUT)
            );
            $procResponse =  $this->_connectionInfo->ExecuteStoredProcedure(AddArtistServiceConsultation, null, $parameterArray);
            return new StatusResponse($procResponse->Outputs[Status]);
        }

        public function DeleteArtistServiceConsultation($artistServiceConsultationId) {
            $parameterArray = array(
                new DatabaseParameter($artistServiceConsultationId, PDO::PARAM_INT, '_artistServiceConsultationId', ParameterDirection::IN),
                new DatabaseParameter(Status, PDO::PARAM_STR, '_status', ParameterDirection::OUT)
            );
            $procResponse =  $this->_connectionInfo->ExecuteStoredProcedure(DeleteArtistServiceConsultation, null, $parameterArray);
            return new StatusResponse($procResponse->Outputs[Status]);
        }

        public function GetArtistServiceConsultations($displayName) {
            $parameterArray = array(
                new DatabaseParameter($displayName, PDO::PARAM_STR, '_displayName', ParameterDirection::IN),
                new DatabaseParameter(Status, PDO::PARAM_STR, '_status', ParameterDirection::OUT)
            );
            $procResponse =  $this->_connectionInfo->ExecuteStoredProcedure(GetArtistServiceConsultations, 'ArtistServiceConsultationDto', $parameterArray);
            return new GetArtistServiceConsultationsResponse($procResponse->Outputs[Status], $procResponse->Results);
        }

        public function GetConsultationTypes() {
            $parameterArray = array(
                new DatabaseParameter(Status, PDO::PARAM_STR, '_status', ParameterDirection::OUT)
            );
            $procResponse =  $this->_connectionInfo->ExecuteStoredProcedure(GetConsultationTypes, 'ConsultationTypeDto', $parameterArray);
            return new GetConsultationTypesResponse($procResponse->Outputs[Status], $procResponse->Results);
        }
    }
?>
