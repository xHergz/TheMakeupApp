<?php
    class GetHairColoursResponse {
        public $Status;

        public $HairColours;

        public function __construct($status, $hairColours) {
            $this->Status = $status;
            if (empty($hairColours)) {
                $this->HairColours = null;
            }
            else {
                $this->HairColours = $hairColours;
            }
        }
    }
?>