<?php
    class GetMakeoverAppointmentsResponse {
        public $Status;

        public $MakeoverAppointments;

        public function __construct($status, $makeoverAppointments) {
            $this->Status = $status;
            if (empty($makeoverAppointments)) {
                $this->MakeoverAppointments = null;
            }
            else {
                $this->MakeoverAppointments = $makeoverAppointments;
            }
        }
    }
?>