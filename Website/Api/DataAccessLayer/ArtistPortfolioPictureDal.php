<?php
    require_once __DIR__.'/../Common/DataAccessLayer.php';
    require_once __DIR__.'/Dto/ArtistProfilePictureDto.php';
    require_once __DIR__.'/Response/GetArtistProfilePicturesResponse.php';
    require_once __DIR__.'/Response/StatusResponse.php';

    define("AddArtistProfilePicture", "AddArtistProfilePicture");
    define("DeleteArtistProfilePicture", "DeleteArtistProfilePicture");
    define("GetArtistProfilePictures", "GetArtistProfilePictures");

    class ArtistProfilePictureDal extends DataAccessLayer {
        public function AddArtistProfilePicture($artistPortfolioId, $imagePath, $makeoverTypeId) {
            $parameterArray = array(
                new DatabaseParameter($artistPortfolioId, PDO::PARAM_INT, '_artistPortfolioId', ParameterDirection::IN),
                new DatabaseParameter($imagePath, PDO::PARAM_STR, '_imagePath', ParameterDirection::IN),
                new DatabaseParameter($makeoverTypeId, PDO::PARAM_INT, '_makeoverTypeId', ParameterDirection::IN),
                new DatabaseParameter(Status, PDO::PARAM_STR, '_status', ParameterDirection::OUT)
            );
            $procResponse =  $this->_connectionInfo->ExecuteStoredProcedure(AddArtistProfilePicture, null, $parameterArray);
            return new StatusResponse($procResponse->Outputs[Status]);
        }

        public function DeleteArtistProfilePicture($artistPortfolioPictureId) {
            $parameterArray = array(
                new DatabaseParameter($artistPortfolioPictureId, PDO::PARAM_INT, '_artistPortfolioPictureId', ParameterDirection::IN),
                new DatabaseParameter(Status, PDO::PARAM_STR, '_status', ParameterDirection::OUT)
            );
            $procResponse =  $this->_connectionInfo->ExecuteStoredProcedure(DeleteArtistProfilePicture, null, $parameterArray);
            return new StatusResponse($procResponse->Outputs[Status]);
        }

        public function GetArtistProfilePictures($displayName) {
            $parameterArray = array(
                new DatabaseParameter($displayName, PDO::PARAM_STR, '_displayName', ParameterDirection::IN),
                new DatabaseParameter(Status, PDO::PARAM_STR, '_status', ParameterDirection::OUT)
            );
            $procResponse =  $this->_connectionInfo->ExecuteStoredProcedure(GetArtistProfilePictures, 'ArtistProfilePictureDto', $parameterArray);
            return new GetArtistProfilePicturesResponse($procResponse->Outputs[Status], $procResponse->Results);
        }
    }
?>
