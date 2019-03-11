<?php
    class GetArtistServicesResponse {
        public $Status;

        public $ArtistServices;

        public function __construct($status, $artistServices) {
            $this->Status = $status;
            if (empty($artistServices)) {
                $this->ArtistServices = null;
            }
            else {
                $this->ArtistServices = $artistServices;
            }
        }
    }
?>