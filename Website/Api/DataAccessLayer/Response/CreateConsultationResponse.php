<?php
    class CreateConsultationResponse {
        public $Status;

        public $NewConsultationId;

        public function __construct($status, $newConsultationId) {
            $this->Status = $status;
            $this->NewConsultationId = $newConsultationId;
        }
    }
?>