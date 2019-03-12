<?php
    require_once __DIR__.'/../Common/DataAccessLayer.php';
    require_once __DIR__.'/Dto/ArtistPortfolioPictureDto.php';
    require_once __DIR__.'/Response/GetArtistPortfolioPicturesResponse.php';
    require_once __DIR__.'/Response/StatusResponse.php';

    define("AddArtistPortfolioPicture", "AddArtistPortfolioPicture");
    define("DeleteArtistPortfolioPicture", "DeleteArtistPortfolioPicture");
    define("GetArtistPortfolioPictures", "GetArtistPortfolioPictures");

    class ArtistPortfolioPictureDal extends DataAccessLayer {
        public function AddArtistPortfolioPicture($artistPortfolioId, $imagePath, $makeoverTypeId) {
            $parameterArray = array(
                new DatabaseParameter($artistPortfolioId, PDO::PARAM_INT, '_artistPortfolioId', ParameterDirection::IN),
                new DatabaseParameter($imagePath, PDO::PARAM_STR, '_imagePath', ParameterDirection::IN),
                new DatabaseParameter($makeoverTypeId, PDO::PARAM_INT, '_makeoverTypeId', ParameterDirection::IN),
                new DatabaseParameter(Status, PDO::PARAM_STR, '_status', ParameterDirection::OUT)
            );
            $procResponse =  $this->_connectionInfo->ExecuteStoredProcedure(AddArtistPortfolioPicture, null, $parameterArray);
            return new StatusResponse($procResponse->Outputs[Status]);
        }

        public function DeleteArtistPortfolioPicture($artistPortfolioPictureId) {
            $parameterArray = array(
                new DatabaseParameter($artistPortfolioPictureId, PDO::PARAM_INT, '_artistPortfolioPictureId', ParameterDirection::IN),
                new DatabaseParameter(Status, PDO::PARAM_STR, '_status', ParameterDirection::OUT)
            );
            $procResponse =  $this->_connectionInfo->ExecuteStoredProcedure(DeleteArtistPortfolioPicture, null, $parameterArray);
            return new StatusResponse($procResponse->Outputs[Status]);
        }

        public function GetArtistPortfolioPictures($displayName) {
            $parameterArray = array(
                new DatabaseParameter($displayName, PDO::PARAM_STR, '_displayName', ParameterDirection::IN),
                new DatabaseParameter(Status, PDO::PARAM_STR, '_status', ParameterDirection::OUT)
            );
            $procResponse =  $this->_connectionInfo->ExecuteStoredProcedure(GetArtistPortfolioPictures, 'ArtistPortfolioPictureDto', $parameterArray);
            return new GetArtistPortfolioPicturesResponse($procResponse->Outputs[Status], $procResponse->Results);
        }
    }
?>
