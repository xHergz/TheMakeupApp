<?php
    class GetMakeoverAppointmentResponse {
        public $Status;

        public $MakeoverAppointment;

        public function __construct($status, $makeoverAppointment) {
            $this->Status = $status;
            if (empty($makeoverAppointment)) {
                $this->MakeoverAppointment = null;
            }
            else {
                $this->MakeoverAppointment = $makeoverAppointment;
            }
        }
    }
?>