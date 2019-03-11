<?php
    class GetServiceTypesResponse {
        public $Status;

        public $ServiceTypes;

        public function __construct($status, $serviceTypes) {
            $this->Status = $status;
            if (empty($serviceTypes)) {
                $this->ServiceTypes = null;
            }
            else {
                $this->ServiceTypes = $serviceTypes;
            }
        }
    }
?>