<?php
    class GetNewNotificationsResponse {
        public $Status;

        public $NumberOfNewNotifications;

        public function __construct($status, $numberOfNewNotifications) {
            $this->Status = $status;
            $this->NumberOfNewNotifications = $numberOfNewNotifications;
        }
    }
?>