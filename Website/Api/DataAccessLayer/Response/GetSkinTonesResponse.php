<?php
    class GetSkinTonesResponse {
        public $Status;

        public $SkinTones;

        public function __construct($status, $skinTones) {
            $this->Status = $status;
            if (empty($skinTones)) {
                $this->SkinTones = null;
            }
            else {
                $this->SkinTones = $skinTones;
            }
        }
    }
?>