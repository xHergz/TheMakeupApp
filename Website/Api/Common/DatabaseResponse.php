<?php
    class DatabaseResponse {
        public $Result;
        public $Status;

        public function __construct($result, $status) {
            $this->Result = $result;
            $this->Status = $status;
        }
    }
?>