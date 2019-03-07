<?php
    require_once __DIR__.'/../Common/DataAccessLayer.php';
    require_once __DIR__.'/Dto/ClientProfileDto.php';
    require_once __DIR__.'/Dto/EyeColourDto.php';
    require_once __DIR__.'/Dto/HairColourDto.php';
    require_once __DIR__.'/Dto/SkinToneDto.php';
    require_once __DIR__.'/Response/GetClientProfileResponse.php';
    require_once __DIR__.'/Response/GetEyeColoursResponse.php';
    require_once __DIR__.'/Response/GetHairColoursResponse.php';
    require_once __DIR__.'/Response/GetSkinTonesResponse.php';
    require_once __DIR__.'/Response/StatusResponse.php';

    define("CreateClientProfile", "CreateClientProfile");
    define("GetClientProfile", "GetClientProfile");
    define("UpdateClientProfile", "UpdateClientProfile");
    define("GetClientProfileByDisplayName", "GetClientProfileByDisplayName");
    define("GetEyeColours", "GetEyeColours");
    define("GetHairColours", "GetHairColours");
    define("GetSkinTones", "GetSkinTones");

    class ClientProfileDal extends DataAccessLayer {
        public function CreateClientProfile($userId, $profilePictureUrl, $biography, $eyeColourId, $hairColourId, $skinToneId) {
            $parameterArray = array(
                new DatabaseParameter($userId, PDO::PARAM_INT, '_userId', ParameterDirection::IN),
                new DatabaseParameter($profilePictureUrl, PDO::PARAM_STR, '_profilePicture', ParameterDirection::IN),
                new DatabaseParameter($biography, PDO::PARAM_STR, '_biography', ParameterDirection::IN),
                new DatabaseParameter($eyeColourId, PDO::PARAM_INT, '_eyeColourId', ParameterDirection::IN),
                new DatabaseParameter($hairColourId, PDO::PARAM_INT, '_hairColourId', ParameterDirection::IN),
                new DatabaseParameter($skinToneId, PDO::PARAM_INT, '_skinToneId', ParameterDirection::IN),
                new DatabaseParameter(Status, PDO::PARAM_STR, '_status', ParameterDirection::OUT)
            );
            $procResponse =  $this->_connectionInfo->ExecuteStoredProcedure(DeactivateSession, null, $parameterArray);
            return new StatusResponse($procResponse->Outputs[Status]);
        }

        public function GetClientProfile($displayName) {
            $parameterArray = array(
                new DatabaseParameter($displayName, PDO::PARAM_STR, '_displayName', ParameterDirection::IN),
                new DatabaseParameter(Status, PDO::PARAM_STR, '_status', ParameterDirection::OUT)
            );
            $procResponse =  $this->_connectionInfo->ExecuteStoredProcedure(GetClientProfile, 'ClientProfileDto', $parameterArray);
            return new GetClientProfileResponse($procResponse->Outputs[Status], $procResponse->GetSingleRow());
        }

        public function UpdateClientProfile($clientProfileId, $profilePictureUrl, $biography, $eyeColourId, $hairColourId, $skinToneId) {
            $parameterArray = array(
                new DatabaseParameter($clientProfileId, PDO::PARAM_INT, '_clientProfileId', ParameterDirection::IN),
                new DatabaseParameter($profilePictureUrl, PDO::PARAM_STR, '_profilePicture', ParameterDirection::IN),
                new DatabaseParameter($biography, PDO::PARAM_STR, '_biography', ParameterDirection::IN),
                new DatabaseParameter($eyeColourId, PDO::PARAM_INT, '_eyeColourId', ParameterDirection::IN),
                new DatabaseParameter($hairColourId, PDO::PARAM_INT, '_hairColourId', ParameterDirection::IN),
                new DatabaseParameter($skinToneId, PDO::PARAM_INT, '_skinToneId', ParameterDirection::IN),
                new DatabaseParameter(Status, PDO::PARAM_STR, '_status', ParameterDirection::OUT)
            );
            $procResponse =  $this->_connectionInfo->ExecuteStoredProcedure(UpdateClientProfile, null, $parameterArray);
            return new StatusResponse($procResponse->Outputs[Status]);
        }

        public function GetClientProfileByDisplayName($displayName) {
            $parameterArray = array(
                new DatabaseParameter($displayName, PDO::PARAM_STR, '_displayName', ParameterDirection::IN)
            );
            return $this->_connectionInfo->ExecuteFunction(GetClientProfileByDisplayName, $parameterArray);
        }

        public function GetEyeColours() {
            $parameterArray = array(
                new DatabaseParameter(Status, PDO::PARAM_STR, '_status', ParameterDirection::OUT)
            );
            $procResponse =  $this->_connectionInfo->ExecuteStoredProcedure(GetEyeColours, 'EyeColourDto', $parameterArray);
            return new GetEyeColoursResponse($procResponse->Outputs[Status], $procResponse->Results);
        }

        public function GetHairColours() {
            $parameterArray = array(
                new DatabaseParameter(Status, PDO::PARAM_STR, '_status', ParameterDirection::OUT)
            );
            $procResponse =  $this->_connectionInfo->ExecuteStoredProcedure(GetHairColours, 'HairColourDto', $parameterArray);
            return new GetHairColoursResponse($procResponse->Outputs[Status], $procResponse->Results);
        }

        public function GetSkinTones() {
            $parameterArray = array(
                new DatabaseParameter(Status, PDO::PARAM_STR, '_status', ParameterDirection::OUT)
            );
            $procResponse =  $this->_connectionInfo->ExecuteStoredProcedure(GetSkinTones, 'SkinToneDto', $parameterArray);
            return new GetSkinTonesResponse($procResponse->Outputs[Status], $procResponse->Results);
        }
    }
?>
