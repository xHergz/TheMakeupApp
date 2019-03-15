<?php
    require_once __DIR__.'/../Common/DataAccessLayer.php';
    require_once __DIR__.'/Dto/MakeoverAppointmentDto.php';
    require_once __DIR__.'/Dto/MakeoverAppointmentAddonDto.php';
    require_once __DIR__.'/Response/CreateMakeoverAppointmentResponse.php';
    require_once __DIR__.'/Response/GetMakeoverAppointmentResponse.php';
    require_once __DIR__.'/Response/GetMakeoverAppointmentAddonsResponse.php';
    require_once __DIR__.'/Response/StatusResponse.php';

    define("CreateMakeoverAppointment", "CreateMakeoverAppointment");
    define("GetMakeoverAppointment", "GetMakeoverAppointment");
    define("AddMakeoverAppointmentAddon", "AddMakeoverAppointmentAddon");
    define("GetMakeoverAppointmentAddons", "GetMakeoverAppointmentAddons");

    class MakeoverAppointmentDal extends DataAccessLayer {
        public function CreateMakeoverAppointment($clientProfileId, $artistPortfolioId, $makeoverTypeId, $serviceTypeId, $servicePrice,
            $consultationTypeId, $consultationPrice, $appointmentDate) {
            $parameterArray = array(
                new DatabaseParameter($clientProfileId, PDO::PARAM_INT, '_clientProfileId', ParameterDirection::IN),
                new DatabaseParameter($artistPortfolioId, PDO::PARAM_INT, '_artistPortfolioId', ParameterDirection::IN),
                new DatabaseParameter($makeoverTypeId, PDO::PARAM_INT, '_makeoverTypeId', ParameterDirection::IN),
                new DatabaseParameter($serviceTypeId, PDO::PARAM_INT, '_serviceTypeId', ParameterDirection::IN),
                new DatabaseParameter($servicePrice, PDO::PARAM_STR, '_servicePrice', ParameterDirection::IN),
                new DatabaseParameter($consultationTypeId, PDO::PARAM_INT, '_consultationTypeId', ParameterDirection::IN),
                new DatabaseParameter($consultationPrice, PDO::PARAM_STR, '_consultationPrice', ParameterDirection::IN),
                new DatabaseParameter($appointmentDate, PDO::PARAM_STR, '_appointmentDate', ParameterDirection::IN),
                new DatabaseParameter(Status, PDO::PARAM_STR, '_status', ParameterDirection::OUT)
            );
            $procResponse = $this->_connectionInfo->ExecuteStoredProcedure(CreateMakeoverAppointment, null, $parameterArray);
            $responseRow = $procResponse->GetSingleRow();
            return new CreateMakeoverAppointmentResponse($procResponse->Outputs[Status], $responseRow['New_Makeover_Appointment_Id']);
        }

        public function GetMakeoverAppointment($makeoverAppointmentId) {
            $parameterArray = array(
                new DatabaseParameter($makeoverAppointmentId, PDO::PARAM_INT, '_makeoverAppointmentId', ParameterDirection::IN),
                new DatabaseParameter(Status, PDO::PARAM_STR, '_status', ParameterDirection::OUT)
            );
            $procResponse = $this->_connectionInfo->ExecuteStoredProcedure(GetMakeoverAppointment, null, $parameterArray);
            return new GetMakeoverAppointmentResponse($procResponse->Outputs[Status], $procResponse->GetSingleRow());
        }

        public function AddMakeoverAppointmentAddon($makeoverAppointmentId, $description, $price) {
            $parameterArray = array(
                new DatabaseParameter($makeoverAppointmentId, PDO::PARAM_INT, '_makeoverAppointmentId', ParameterDirection::IN),
                new DatabaseParameter($description, PDO::PARAM_STR, '_description', ParameterDirection::IN),
                new DatabaseParameter($price, PDO::PARAM_STR, '_price', ParameterDirection::IN),
                new DatabaseParameter(Status, PDO::PARAM_STR, '_status', ParameterDirection::OUT)
            );
            $procResponse = $this->_connectionInfo->ExecuteStoredProcedure(AddMakeoverAppointmentAddon, null, $parameterArray);
            return new StatusResponse($procResponse->Outputs[Status]);
        }

        public function GetMakeoverAppointmentAddons($makeoverAppointmentId) {
            $parameterArray = array(
                new DatabaseParameter($makeoverAppointmentId, PDO::PARAM_INT, '_makeoverAppointmentId', ParameterDirection::IN),
                new DatabaseParameter(Status, PDO::PARAM_STR, '_status', ParameterDirection::OUT)
            );
            $procResponse = $this->_connectionInfo->ExecuteStoredProcedure(GetMakeoverAppointmentAddons, null, $parameterArray);
            return new GetMakeoverAppointmentAddonsResponse($procResponse->Outputs[Status], $procResponse->Results);
        }
    }
?>
