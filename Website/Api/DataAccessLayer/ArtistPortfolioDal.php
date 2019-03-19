<?php
    require_once __DIR__.'/../Common/DataAccessLayer.php';
    require_once __DIR__.'/Dto/ArtistPortfolioDto.php';
    require_once __DIR__.'/Response/GetArtistPortfolioResponse.php';
    require_once __DIR__.'/Response/GetArtistPortfoliosResponse.php';
    require_once __DIR__.'/Response/StatusResponse.php';

    define("CreateArtistPortfolio", "CreateArtistPortfolio");
    define("GetArtistPortfolio", "GetArtistPortfolio");
    define("GetArtistPortfolios", "GetArtistPortfolios");
    define("UpdateArtistPortfolio", "UpdateArtistPortfolio");

    class ArtistPortfolioDal extends DataAccessLayer {
        public function CreateArtistPortfolio($userId, $profilePictureUrl, $biography) {
            $parameterArray = array(
                new DatabaseParameter($userId, PDO::PARAM_INT, '_userId', ParameterDirection::IN),
                new DatabaseParameter($profilePictureUrl, PDO::PARAM_STR, '_profilePicture', ParameterDirection::IN),
                new DatabaseParameter($biography, PDO::PARAM_STR, '_biography', ParameterDirection::IN),
                new DatabaseParameter(Status, PDO::PARAM_STR, '_status', ParameterDirection::OUT)
            );
            $procResponse =  $this->_connectionInfo->ExecuteStoredProcedure(CreateArtistPortfolio, null, $parameterArray);
            return new StatusResponse($procResponse->Outputs[Status]);
        }

        public function GetArtistPortfolio($displayName) {
            $parameterArray = array(
                new DatabaseParameter($displayName, PDO::PARAM_STR, '_displayName', ParameterDirection::IN),
                new DatabaseParameter(Status, PDO::PARAM_STR, '_status', ParameterDirection::OUT)
            );
            $procResponse =  $this->_connectionInfo->ExecuteStoredProcedure(GetArtistPortfolio, 'ArtistPortfolioDto', $parameterArray);
            return new GetArtistPortfolioResponse($procResponse->Outputs[Status], $procResponse->GetSingleRow());
        }

        public function GetArtistPortfolios() {
            $parameterArray = array(
                new DatabaseParameter(Status, PDO::PARAM_STR, '_status', ParameterDirection::OUT)
            );
            $procResponse =  $this->_connectionInfo->ExecuteStoredProcedure(GetArtistPortfolios, 'stdClass', $parameterArray);
            return new GetArtistPortfoliosResponse($procResponse->Outputs[Status], $procResponse->Results);
        }

        public function UpdateArtistPortfolio($artistPortfolioId, $profilePictureUrl, $biography) {
            $parameterArray = array(
                new DatabaseParameter($artistPortfolioId, PDO::PARAM_INT, '_artistPortfolioId', ParameterDirection::IN),
                new DatabaseParameter($profilePictureUrl, PDO::PARAM_STR, '_profilePicture', ParameterDirection::IN),
                new DatabaseParameter($biography, PDO::PARAM_STR, '_biography', ParameterDirection::IN),
                new DatabaseParameter(Status, PDO::PARAM_STR, '_status', ParameterDirection::OUT)
            );
            $procResponse =  $this->_connectionInfo->ExecuteStoredProcedure(UpdateArtistPortfolio, null, $parameterArray);
            return new StatusResponse($procResponse->Outputs[Status]);
        }
    }
?>
