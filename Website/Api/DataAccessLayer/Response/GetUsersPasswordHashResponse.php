<?php
    class GetUsersPasswordHashResponse {
        public $Status;

        public $UserId;

        public $PasswordHash;

        public function __construct($status, $userId, $passwordHash) {
            $this->Status = $status;
            $this->UserId = $userId;
            $this->PasswordHash = $passwordHash;
        }
    }
?>