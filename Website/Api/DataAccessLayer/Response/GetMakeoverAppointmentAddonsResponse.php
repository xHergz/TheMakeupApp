<?php
    class GetMakeoverAppointmentAddonsResponse {
        public $Status;

        public $MakeoverAppointmentAddons;

        public function __construct($status, $makeoverAppointmentAddons) {
            $this->Status = $status;
            if (empty($makeoverAppointmentAddons)) {
                $this->MakeoverAppointmentAddons = null;
            }
            else {
                $this->MakeoverAppointmentAddons = $makeoverAppointmentAddons;
            }
        }
    }
?>