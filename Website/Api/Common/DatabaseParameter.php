<?php
    class DatabaseParameter {
        public $Value;
        public $Type;

        public function __construct($value, $type) {
            $this->Value = $value;
            $this->Type = $type;
        }
    }
?>