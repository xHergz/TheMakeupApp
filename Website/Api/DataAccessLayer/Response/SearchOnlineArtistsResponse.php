<?php
    class SearchOnlineArtistsResponse {
        public $Status;

        public $SearchResults;

        public function __construct($status, $searchResults) {
            $this->Status = $status;
            if (empty($searchResults)) {
                $this->SearchResults = null;
            }
            else {
                $this->SearchResults = $searchResults;
            }
        }
    }
?>