<?php
    class GetArtistPortfoliosResponse {
        public $Status;

        public $ArtistPortfolios;

        public function __construct($status, $artistPortfolios) {
            $this->Status = $status;
            $this->ArtistPortfolios = $artistPortfolios;
        }
    }
?>