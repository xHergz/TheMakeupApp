<?php
    class CreateSessionResponse {
        public $Status;

        public $NewSessionKey;

        public function __construct($status, $newSessionKey) {
            $this->Status = $status;
            $this->NewSessionKey = $newSessionKey;
        }
    }
?>