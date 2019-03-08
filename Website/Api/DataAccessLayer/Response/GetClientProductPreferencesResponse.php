<?php
    class GetClientProductPreferencesResponse {
        public $Status;

        public $ClientProductPreferences;

        public function __construct($status, $clientProductPreferences) {
            $this->Status = $status;
            if (empty($clientProductPreferences)) {
                $this->ClientProductPreferences = null;
            }
            else {
                $this->ClientProductPreferences = $clientProductPreferences;
            }
        }
    }
?>