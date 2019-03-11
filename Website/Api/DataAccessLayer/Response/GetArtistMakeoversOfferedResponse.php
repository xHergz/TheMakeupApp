<?php
    class GetArtistMakeoversOfferedResponse {
        public $Status;

        public $ArtistMakeoversOffered;

        public function __construct($status, $artistMakeoversOffered) {
            $this->Status = $status;
            if (empty($artistMakeoversOffered)) {
                $this->ArtistMakeoversOffered = null;
            }
            else {
                $this->ArtistMakeoversOffered = $artistMakeoversOffered;
            }
        }
    }
?>