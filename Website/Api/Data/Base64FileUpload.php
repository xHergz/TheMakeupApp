<?php
    require_once '../../private/Api/Common/Utilities.php';

    class Base64FileUpload {
        public $Data;

        public $Type;

        public function __construct($fileData) {
            $imageComponents = explode(",", $fileData);
            $this->Type = get_string_between($imageComponents[0], ":", ";");
            $this->Data = $imageComponents[1];
        }
    }

?>