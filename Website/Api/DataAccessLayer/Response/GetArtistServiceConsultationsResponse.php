<?php
    class GetArtistServiceConsultationsResponse {
        public $Status;

        public $ArtistServiceConsultations;

        public function __construct($status, $artistServiceConsultations) {
            $this->Status = $status;
            if (empty($artistServiceConsultations)) {
                $this->ArtistServiceConsultations = null;
            }
            else {
                $this->ArtistServiceConsultations = $artistServiceConsultations;
            }
        }
    }
?>