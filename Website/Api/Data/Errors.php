<?php
    define("UNKNOWN_ERROR_MESSAGE", "Unknown Error");
    define("GENERAL_ERROR_MESSAGE", "Error");
    define("SUCCESS_MESSAGE", "Success");
    define("EMAIL_UNAVAILABLE_MESSAGE", "Email Unavailable");
    define("DISPLAY_NAME_UNAVAILABLE_MESSAGE", "Display Name Unavailable");

    class Errors {
        public const GENERAL_ERROR = -1;
        public const SUCCESS = 0;
        public const EMAIL_UNAVAILABLE = 1001;
        public const DISPLAY_NAME_UNAVAILABLE = 1002;

        public static function GetErrorMessage($errorCode) {
            switch($errorCode) {
                case self::GENERAL_ERROR:
                    return self::ConstructMessage($errorCode, GENERAL_ERROR_MESSAGE);
                case self::SUCCESS:
                    return self::ConstructMessage($errorCode, SUCCESS_MESSAGE);
                case self::EMAIL_UNAVAILABLE:
                    return self::ConstructMessage($errorCode, EMAIL_UNAVAILABLE_MESSAGE);
                case self::DISPLAY_NAME_UNAVAILABLE:
                    return self::ConstructMessage($errorCode, DISPLAY_NAME_UNAVAILABLE_MESSAGE);
                default:
                    return self::ConstructMessage($errorCode, UNKNOWN_ERROR_MESSAGE);
            }   
        }

        private static function ConstructMessage($code, $message) {
            return $message." (".$code.")";
        }
    }
?>