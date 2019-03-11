<?php
    class GetArtistPortfolioPicturesResponse {
        public $Status;

        public $ArtistPortfolioPictures;

        public function __construct($status, $artistPortfolioPictures) {
            $this->Status = $status;
            if (empty($artistPortfolioPictures)) {
                $this->ArtistPortfolioPictures = null;
            }
            else {
                $this->ArtistPortfolioPictures = $artistPortfolioPictures;
            }
        }
    }
?>