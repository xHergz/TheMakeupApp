<?php
    require_once __DIR__.'/../Common/DataAccessLayer.php';
    require_once __DIR__.'/Dto/ArtistMakeoverOfferedDto.php';
    require_once __DIR__.'/Dto/MakeoverTypeDto.php';
    require_once __DIR__.'/Response/GetArtistMakeoversOfferedResponse.php';
    require_once __DIR__.'/Response/GetMakeoverTypesResponse.php';
    require_once __DIR__.'/Response/StatusResponse.php';

    define("AddArtistMakeoverOffered", "AddArtistMakeoverOffered");
    define("DeleteArtistMakeoverOffered", "DeleteArtistMakeoverOffered");
    define("GetArtistMakeoversOffered", "GetArtistMakeoversOffered");
    define("GetMakeoverTypes", "GetMakeoverTypes");

    class ArtistMakeoverOfferedDal extends DataAccessLayer {
        public function AddArtistMakeoverOffered($artistPortfolioId, $makeoverTypeId) {
            $parameterArray = array(
                new DatabaseParameter($artistPortfolioId, PDO::PARAM_INT, '_artistPortfolioId', ParameterDirection::IN),
                new DatabaseParameter($makeoverTypeId, PDO::PARAM_INT, '_makeoverTypeId', ParameterDirection::IN),
                new DatabaseParameter(Status, PDO::PARAM_STR, '_status', ParameterDirection::OUT)
            );
            $procResponse =  $this->_connectionInfo->ExecuteStoredProcedure(AddArtistMakeoverOffered, null, $parameterArray);
            return new StatusResponse($procResponse->Outputs[Status]);
        }

        public function DeleteArtistMakeoverOffered($artistMakeoverOfferedId) {
            $parameterArray = array(
                new DatabaseParameter($artistMakeoverOfferedId, PDO::PARAM_INT, '_artistMakeoverOfferedId', ParameterDirection::IN),
                new DatabaseParameter(Status, PDO::PARAM_STR, '_status', ParameterDirection::OUT)
            );
            $procResponse =  $this->_connectionInfo->ExecuteStoredProcedure(DeleteArtistMakeoverOffered, null, $parameterArray);
            return new StatusResponse($procResponse->Outputs[Status]);
        }

        public function GetArtistMakeoversOffered($displayName) {
            $parameterArray = array(
                new DatabaseParameter($displayName, PDO::PARAM_STR, '_displayName', ParameterDirection::IN),
                new DatabaseParameter(Status, PDO::PARAM_STR, '_status', ParameterDirection::OUT)
            );
            $procResponse =  $this->_connectionInfo->ExecuteStoredProcedure(GetArtistMakeoversOffered, 'ArtistMakeoverOfferedDto', $parameterArray);
            return new GetArtistMakeoversOfferedResponse($procResponse->Outputs[Status], $procResponse->Results);
        }

        public function GetMakeoverTypes() {
            $parameterArray = array(
                new DatabaseParameter(Status, PDO::PARAM_STR, '_status', ParameterDirection::OUT)
            );
            $procResponse =  $this->_connectionInfo->ExecuteStoredProcedure(GetMakeoverTypes, 'MakeoverTypeDto', $parameterArray);
            return new GetMakeoverTypesResponse($procResponse->Outputs[Status], $procResponse->Results);
        }
    }
?>
