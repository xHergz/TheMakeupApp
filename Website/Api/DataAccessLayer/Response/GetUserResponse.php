<?php
    class GetUserResponse {
        public $Status;

        public $User;

        public function __construct($status, $user) {
            $this->Status = $status;
            if (empty($user)) {
                $this->User = null;
            }
            else {
                $this->User = $user;
            }
        }
    }
?>