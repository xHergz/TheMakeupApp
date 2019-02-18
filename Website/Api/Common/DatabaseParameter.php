<?php
    require_once __DIR__.'/ParameterDirection.php';

    class DatabaseParameter {
        public $Name;

        public $Value;

        public $Type;

        public $Direction;

        public function __construct($value, $type, $name = null, $direction = ParameterDirection::IN) {
            $this->Value = $value;
            $this->Type = $type;
            $this->Name = $name;
            $this->Direction = $direction;
        }
    }
?>