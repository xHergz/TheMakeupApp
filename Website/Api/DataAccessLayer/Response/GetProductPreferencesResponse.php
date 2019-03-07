<?php
    class GetProductPreferencesResponse {
        public $Status;

        public $ProductPreferences;

        public function __construct($status, $productPreferences) {
            $this->Status = $status;
            if (empty($productPreferences)) {
                $this->ProductPreferences = null;
            }
            else {
                $this->ProductPreferences = $productPreferences;
            }
        }
    }
?>