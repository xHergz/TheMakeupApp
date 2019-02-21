<?php
    class GetNotificationsResponse {
        public $Status;

        public $Notifications;

        public function __construct($status, $notifications) {
            $this->Status = $status;
            $this->Notifications = $notifications;
        }
    }
?>