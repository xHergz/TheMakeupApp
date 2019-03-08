<?php
    class GetAllergiesAndSensitivitiesResponse {
        public $Status;

        public $AllergiesAndSensitivities;

        public function __construct($status, $allergiesAndSensitivities) {
            $this->Status = $status;
            if (empty($allergiesAndSensitivities)) {
                $this->AllergiesAndSensitivities = null;
            }
            else {
                $this->AllergiesAndSensitivities = $allergiesAndSensitivities;
            }
        }
    }
?>