<?php
    class GetEyeColoursResponse {
        public $Status;

        public $EyeColours;

        public function __construct($status, $eyeColours) {
            $this->Status = $status;
            if (empty($eyeColours)) {
                $this->EyeColours = null;
            }
            else {
                $this->EyeColours = $eyeColours;
            }
        }
    }
?>