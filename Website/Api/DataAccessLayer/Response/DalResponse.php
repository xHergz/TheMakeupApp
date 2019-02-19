<?php
    class DalResponse {
        public $Status;

        public $Results;

        public function __construct($status = 0, $results = null) {
            $this->Status = $status;
            $this->Results = $results;
        }
    }
?>