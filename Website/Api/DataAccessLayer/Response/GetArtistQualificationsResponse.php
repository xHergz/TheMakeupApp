<?php
    class GetArtistQualificationsResponse {
        public $Status;

        public $ArtistQualifications;

        public function __construct($status, $artistQualifications) {
            $this->Status = $status;
            if (empty($artistQualifications)) {
                $this->ArtistQualifications = null;
            }
            else {
                $this->ArtistQualifications = $artistQualifications;
            }
        }
    }
?>