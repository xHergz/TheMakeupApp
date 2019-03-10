<?php
    class CreateArtistApplicationResponse {
        public $Status;

        public $NewApplicationId;

        public function __construct($status, $newApplicationId) {
            $this->Status = $status;
            $this->NewApplicationId = $newApplicationId;
        }
    }
?>