<?php
    class GetSessionInfoResponse {
        public $Status;

        public $Session;

        public function __construct($status, $session) {
            $this->Status = $status;
            if (empty($session)) {
                $this->Session = null;
            }
            else {
                $this->Session = $session;
            }
        }
    }
?>