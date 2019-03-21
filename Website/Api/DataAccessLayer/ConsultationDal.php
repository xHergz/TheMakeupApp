<?php
    require_once __DIR__.'/../Common/DataAccessLayer.php';
    require_once __DIR__.'/Response/CreateConsultationResponse.php';
    require_once __DIR__.'/Response/GetConsultationInformationResponse.php';
    require_once __DIR__.'/Response/StatusResponse.php';

    define("CreateConsultation", "CreateConsultation");
    define("GetConsultationInformation", "GetConsultationInformation");

    class ConsultationDal extends DataAccessLayer {
        public function CreateConsultation($clientProfileId, $artistPortfolioId) {
            $parameterArray = array(
                new DatabaseParameter($clientProfileId, PDO::PARAM_INT, '_clientProfileId', ParameterDirection::IN),
                new DatabaseParameter($artistPortfolioId, PDO::PARAM_INT, '_artistPortfolioId', ParameterDirection::IN),
                new DatabaseParameter(Status, PDO::PARAM_STR, '_status', ParameterDirection::OUT)
            );
            $procResponse = $this->_connectionInfo->ExecuteStoredProcedure(CreateConsultation, null, $parameterArray);
            $responseRow = $procResponse->GetSingleRow();
            return new CreateConsultationResponse($procResponse->Outputs[Status], $responseRow['New_Consultation_Id']);
        }

        public function GetConsultationInformation($consultationId) {
            $parameterArray = array(
                new DatabaseParameter($consultationId, PDO::PARAM_INT, '_consultationId', ParameterDirection::IN),
                new DatabaseParameter(Status, PDO::PARAM_STR, '_status', ParameterDirection::OUT)
            );
            $procResponse = $this->_connectionInfo->ExecuteStoredProcedure(GetConsultationInformation, null, $parameterArray);
            return new GetConsultationInformationResponse($procResponse->Outputs[Status], $procResponse->GetSingleRow());
        }
    }
?>
