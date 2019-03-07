<?php
    class GetClientProfileResponse {
        public $Status;

        public $ClientProfile;

        public function __construct($status, $clientProfile) {
            $this->Status = $status;
            if (empty($clientProfile)) {
                $this->ClientProfile = null;
            }
            else {
                $this->ClientProfile = $clientProfile;
            }
        }
    }
?>