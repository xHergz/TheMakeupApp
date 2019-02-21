<?php
    class CreateUserResponse {
        public $Status;

        public $NewUserId;

        public function __construct($status, $newUserId) {
            $this->Status = $status;
            $this->NewUserId = $newUserId;
        }
    }
?>