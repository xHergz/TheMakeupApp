<?php
    class GetClientReviewsResponse {
        public $Status;

        public $ClientReviews;

        public function __construct($status, $clientReviews) {
            $this->Status = $status;
            if (empty($clientReviews)) {
                $this->ClientReviews = null;
            }
            else {
                $this->ClientReviews = $clientReviews;
            }
        }
    }
?>