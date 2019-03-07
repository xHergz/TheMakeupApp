<?php
    require_once '../../private/Api/Common/Utilities.php';

    class Base64ImageUpload {
        public $Data;

        public $Type;

        public function __construct($imageData) {
            $imageComponents = explode(",", $imageData);
            $this->Type = get_string_between($imageComponents[0], ":", ";");
            $this->Data = $imageComponents[1];
        }
    }

?>