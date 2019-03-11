<?php
    class GetArtistServiceAddonsResponse {
        public $Status;

        public $ArtistServiceAddons;

        public function __construct($status, $artistServiceAddons) {
            $this->Status = $status;
            if (empty($artistServiceAddons)) {
                $this->ArtistServiceAddons = null;
            }
            else {
                $this->ArtistServiceAddons = $artistServiceAddons;
            }
        }
    }
?>