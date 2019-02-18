<?php
    class ProcedureResponse {
        public $Outputs;

        public $Results;

        public function __construct($outputs, $results) {
            $this->Outputs = $outputs;
            $this->Results = $results;
        }
    }
?>