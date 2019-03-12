<?php
    class GetConsultationTypesResponse {
        public $Status;

        public $ConsultationTypes;

        public function __construct($status, $consultationTypes) {
            $this->Status = $status;
            if (empty($consultationTypes)) {
                $this->ConsultationTypes = null;
            }
            else {
                $this->ConsultationTypes = $consultationTypes;
            }
        }
    }
?>