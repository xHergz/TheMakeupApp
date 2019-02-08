<?php
    require_once 'Errors.php';

    class ErrorList {
        private $errors;

        public function __construct() {
            $this->errors = array();
        }

        public function AddError($errorCode) {
            array_push($this->errors, Errors::GetErrorMessage($errorCode));
        }

        public function AddErrors($errorCodes) {
            foreach ($errorCodes as $code) {
                array_push($this->errors, Errors::GetErrorMessage($code));
            }
        }

        public function GetErrors() {
            return $this->errors;
        }
    }
?>