<?php
    class ProcedureResponse {
        public $Outputs;

        public $Results;

        public function __construct($outputs, $results) {
            $this->Outputs = $outputs;
            $this->Results = $results;
        }

        public function GetSingleRow() {
            if (empty($this->Results)) {
                return null;
            }
            return $this->Results[0];
        }
    }
?>