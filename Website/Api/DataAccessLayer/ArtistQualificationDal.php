<?php
    require_once __DIR__.'/../Common/DataAccessLayer.php';
    require_once __DIR__.'/Dto/ArtistQualificationDto.php';
    require_once __DIR__.'/Response/GetArtistQualificationsResponse.php';
    require_once __DIR__.'/Response/StatusResponse.php';

    define("AddArtistQualification", "AddArtistQualification");
    define("DeleteArtistQualification", "DeleteArtistQualification");
    define("GetArtistQualifications", "GetArtistQualifications");

    class ArtistQualificationDal extends DataAccessLayer {
        public function AddArtistQualification($artistPortfolioId, $yearObtained, $description) {
            $parameterArray = array(
                new DatabaseParameter($artistPortfolioId, PDO::PARAM_INT, '_artistPortfolioId', ParameterDirection::IN),
                new DatabaseParameter($yearObtained, PDO::PARAM_INT, '_yearObtained', ParameterDirection::IN),
                new DatabaseParameter($description, PDO::PARAM_STR, '_description', ParameterDirection::IN),
                new DatabaseParameter(Status, PDO::PARAM_STR, '_status', ParameterDirection::OUT)
            );
            $procResponse =  $this->_connectionInfo->ExecuteStoredProcedure(AddArtistQualification, null, $parameterArray);
            return new StatusResponse($procResponse->Outputs[Status]);
        }

        public function DeleteArtistQualification($artistQualificationId) {
            $parameterArray = array(
                new DatabaseParameter($artistQualificationId, PDO::PARAM_INT, '_artistQualificationId', ParameterDirection::IN),
                new DatabaseParameter(Status, PDO::PARAM_STR, '_status', ParameterDirection::OUT)
            );
            $procResponse =  $this->_connectionInfo->ExecuteStoredProcedure(DeleteArtistQualification, null, $parameterArray);
            return new StatusResponse($procResponse->Outputs[Status]);
        }

        public function GetArtistQualifications($displayName) {
            $parameterArray = array(
                new DatabaseParameter($displayName, PDO::PARAM_STR, '_displayName', ParameterDirection::IN),
                new DatabaseParameter(Status, PDO::PARAM_STR, '_status', ParameterDirection::OUT)
            );
            $procResponse =  $this->_connectionInfo->ExecuteStoredProcedure(GetArtistQualifications, 'ArtistQualificationDto', $parameterArray);
            return new GetArtistQualificationsResponse($procResponse->Outputs[Status], $procResponse->Results);
        }
    }
?>
