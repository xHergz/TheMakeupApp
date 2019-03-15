<?php
    class CreateMakeoverAppointmentResponse {
        public $Status;

        public $NewMakeoverAppointmentId;

        public function __construct($status, $newMakeoverAppointmentId) {
            $this->Status = $status;
            $this->NewMakeoverAppointmentId = $newMakeoverAppointmentId;
        }
    }
?>