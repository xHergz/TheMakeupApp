<?php
    require_once __DIR__.'/../Common/DataAccessLayer.php';
    require_once __DIR__.'/Response/SearchOnlineArtistsResponse.php';
    require_once __DIR__.'/Response/StatusResponse.php';

    define("SetArtistOnline", "SetArtistOnline");
    define("SetArtistOffline", "SetArtistOffline");
    define("SearchOnlineArtists", "SearchOnlineArtists");

    class OnlineArtistDal extends DataAccessLayer {
        public function SetArtistOnline($artistPortfolioId, $longitude, $latitude) {
            $parameterArray = array(
                new DatabaseParameter($artistPortfolioId, PDO::PARAM_INT, '_artistPortfolioId', ParameterDirection::IN),
                new DatabaseParameter($longitude, PDO::PARAM_STR, '_longitude', ParameterDirection::IN),
                new DatabaseParameter($latitude, PDO::PARAM_STR, '_latitude', ParameterDirection::IN),
                new DatabaseParameter(Status, PDO::PARAM_STR, '_status', ParameterDirection::OUT)
            );
            $procResponse = $this->_connectionInfo->ExecuteStoredProcedure(SetArtistOnline, null, $parameterArray);
            return new StatusResponse($procResponse->Outputs[Status]);
        }

        public function SetArtistOffline($artistPortfolioId) {
            $parameterArray = array(
                new DatabaseParameter($artistPortfolioId, PDO::PARAM_INT, '_artistPortfolioId', ParameterDirection::IN),
                new DatabaseParameter(Status, PDO::PARAM_STR, '_status', ParameterDirection::OUT)
            );
            $procResponse = $this->_connectionInfo->ExecuteStoredProcedure(SetArtistOffline, null, $parameterArray);
            return new StatusResponse($procResponse->Outputs[Status]);
        }

        public function SearchOnlineArtists($makeoverTypeId, $serviceTypeId, $userLongitude, $userLatitude, $maxDistance) {
            $parameterArray = array(
                new DatabaseParameter($makeoverTypeId, PDO::PARAM_INT, '_makeoverTypeId', ParameterDirection::IN),
                new DatabaseParameter($serviceTypeId, PDO::PARAM_INT, '_serviceTypeId', ParameterDirection::IN),
                new DatabaseParameter($userLongitude, PDO::PARAM_STR, '_userLongitude', ParameterDirection::IN),
                new DatabaseParameter($userLatitude, PDO::PARAM_STR, '_userLatitude', ParameterDirection::IN),
                new DatabaseParameter($maxDistance, PDO::PARAM_INT, '_maxDistance', ParameterDirection::IN),
                new DatabaseParameter(Status, PDO::PARAM_STR, '_status', ParameterDirection::OUT)
            );
            $procResponse = $this->_connectionInfo->ExecuteStoredProcedure(SearchOnlineArtists, 'stdClass', $parameterArray);
            return new SearchOnlineArtistsResponse($procResponse->Outputs[Status], $procResponse->Results);
        }
    }
?>
