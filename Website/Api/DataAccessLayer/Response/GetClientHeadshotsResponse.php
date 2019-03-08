<?php
    class GetClientHeadshotsResponse {
        public $Status;

        public $ClientHeadshots;

        public function __construct($status, $clientHeadshots) {
            $this->Status = $status;
            if (empty($clientHeadshots)) {
                $this->ClientHeadshots = null;
            }
            else {
                $this->ClientHeadshots = $clientHeadshots;
            }
        }
    }
?>