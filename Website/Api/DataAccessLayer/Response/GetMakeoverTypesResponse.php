<?php
    class GetMakeoverTypesResponse {
        public $Status;

        public $MakeoverTypes;

        public function __construct($status, $makeoverTypes) {
            $this->Status = $status;
            if (empty($makeoverTypes)) {
                $this->MakeoverTypes = null;
            }
            else {
                $this->MakeoverTypes = $makeoverTypes;
            }
        }
    }
?>