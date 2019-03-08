<?php
    class GetClientAllergiesAndSensitivitiesResponse {
        public $Status;

        public $ClientAllergiesAndSensitivities;

        public function __construct($status, $clientAllergiesAndSensitivities) {
            $this->Status = $status;
            if (empty($clientAllergiesAndSensitivities)) {
                $this->ClientAllergiesAndSensitivities = null;
            }
            else {
                $this->ClientAllergiesAndSensitivities = $clientAllergiesAndSensitivities;
            }
        }
    }
?>