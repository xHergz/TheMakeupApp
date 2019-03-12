<?php
    require_once __DIR__.'/../Common/DataAccessLayer.php';
    require_once __DIR__.'/Dto/ArtistServiceAddonDto.php';
    require_once __DIR__.'/Response/GetArtistServiceAddonsResponse.php';
    require_once __DIR__.'/Response/StatusResponse.php';

    define("AddArtistServiceAddon", "AddArtistServiceAddon");
    define("DeleteArtistServiceAddon", "DeleteArtistServiceAddon");
    define("GetArtistServiceAddons", "GetArtistServiceAddons");

    class ArtistServiceAddonDal extends DataAccessLayer {
        public function AddArtistServiceAddon($artistServiceId, $description, $price) {
            $parameterArray = array(
                new DatabaseParameter($artistServiceId, PDO::PARAM_INT, '_artistServiceId', ParameterDirection::IN),
                new DatabaseParameter($description, PDO::PARAM_STR, '_description', ParameterDirection::IN),
                new DatabaseParameter($price, PDO::PARAM_INT, '_price', ParameterDirection::IN),
                new DatabaseParameter(Status, PDO::PARAM_STR, '_status', ParameterDirection::OUT)
            );
            $procResponse =  $this->_connectionInfo->ExecuteStoredProcedure(AddArtistServiceAddon, null, $parameterArray);
            return new StatusResponse($procResponse->Outputs[Status]);
        }

        public function DeleteArtistServiceAddon($artistServiceAddonId) {
            $parameterArray = array(
                new DatabaseParameter($artistServiceAddonId, PDO::PARAM_INT, '_artistServiceAddonId', ParameterDirection::IN),
                new DatabaseParameter(Status, PDO::PARAM_STR, '_status', ParameterDirection::OUT)
            );
            $procResponse =  $this->_connectionInfo->ExecuteStoredProcedure(DeleteArtistServiceAddon, null, $parameterArray);
            return new StatusResponse($procResponse->Outputs[Status]);
        }

        public function GetArtistServiceAddons($displayName) {
            $parameterArray = array(
                new DatabaseParameter($displayName, PDO::PARAM_STR, '_displayName', ParameterDirection::IN),
                new DatabaseParameter(Status, PDO::PARAM_STR, '_status', ParameterDirection::OUT)
            );
            $procResponse =  $this->_connectionInfo->ExecuteStoredProcedure(GetArtistServiceAddons, 'ArtistServiceAddonDto', $parameterArray);
            return new GetArtistServiceAddonsResponse($procResponse->Outputs[Status], $procResponse->Results);
        }
    }
?>
