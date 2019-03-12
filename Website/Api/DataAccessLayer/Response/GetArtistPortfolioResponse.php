<?php
    class GetArtistPortfolioResponse {
        public $Status;

        public $ArtistPortfolio;

        public function __construct($status, $artistPortfolio) {
            $this->Status = $status;
            $this->ArtistPortfolio = $artistPortfolio;
        }
    }
?>