<?php
    require_once __DIR__.'/../Common/Validation.php';
    require_once __DIR__.'/Errors.php';

    class ClientReview {
        public $ClientReviewId;

        public $ClientProfileId;

        public $ArtistPortfolioId;

        public $Rating;

        public $Review;

        public function __construct($clientReviewId, $clientProfileId, $artistPortfolioId, $rating, $review) {
            $this->ClientReviewId = $clientReviewId;
            $this->ClientProfileId = $clientProfileId;
            $this->ArtistPortfolioId = $artistPortfolioId;
            $this->Rating = $rating;
            $this->Review = $review;
        }

        public function GetCreateErrors() {
            $errorCodes = array();

            if ($this->Rating == null || !$this->IsRatingValid()) {
                array_push($errorCodes, Errors::RATING_INVALID);
            }

            if ($this->Review == null || !$this->IsReviewValid()) {
                array_push($errorCodes, Errors::REVIEW_INVALID);
            }

            return $errorCodes;
        }

        public function GetUpdateErrors() {
            $errorCodes = array();

            if ($this->Rating != null && !$this->IsRatingValid()) {
                array_push($errorCodes, Errors::RATING_INVALID);
            }

            if ($this->Review != null && !$this->IsReviewValid()) {
                array_push($errorCodes, Errors::REVIEW_INVALID);
            }

            return $errorCodes;
        }

        private function IsRatingValid() {
            return Validation::ValidateRating($this->Rating);
        }

        private function IsReviewValid() {
            return Validation::ValidateReview($this->Review);
        }
    }
?>