<?php
    class GetConsultationInformationResponse {
        public $Status;

        public $Consultation;

        public function __construct($status, $consultation) {
            $this->Status = $status;
            if (empty($consultation)) {
                $this->Consultation = null;
            }
            else {
                $this->Consultation = $consultation;
            }
        }
    }
?>