<?php
    define("UNKNOWN_ERROR_MESSAGE", "Unknown Error");
    define("DATABASE_INITIALIZATION_ERROR_MESSAGE", "Could not initialize database connection");
    define("GENERAL_ERROR_MESSAGE", "Error");
    define("SUCCESS_MESSAGE", "Success");
    define("EMAIL_INVALID_MESSAGE", "Email is invalid");
    define("PASSWORD_INVALID_MESSAGE", "Password is invalid");
    define("PASSWORD_NOT_CONFIRMED_MESSAGE", "Password is not confirmed");
    define("DISPLAY_NAME_INVALID_MESSAGE", "Display name is invalid");
    define("FIRST_NAME_INVALID_MESSAGE", "First name is invalid");
    define("LAST_NAME_INVALID_MESSAGE", "Last name is invalid");
    define("EMAIL_UNAVAILABLE_MESSAGE", "Email Unavailable");
    define("DISPLAY_NAME_UNAVAILABLE_MESSAGE", "Display Name Unavailable");

    class Errors {
        public const DATABASE_INITIALIZATION_ERROR = -2;
        public const GENERAL_ERROR = -1;
        public const SUCCESS = 0;
        public const EMAIL_INVALID = 11;
        public const PASSWORD_INVALID = 12;
        public const PASSWORD_NOT_CONFIRMED = 13;
        public const DISPLAY_NAME_INVALID = 14;
        public const FIRST_NAME_INVALID = 15;
        public const LAST_NAME_INVALID = 16;
        public const EMAIL_UNAVAILABLE = 1001;
        public const DISPLAY_NAME_UNAVAILABLE = 1002;

        public static function GetErrorMessage($errorCode) {
            switch($errorCode) {
                case self::DATABASE_INITIALIZATION_ERROR:
                    return self::ConstructMessage($errorCode, DATABASE_INITIALIZATION_ERROR_MESSAGE);
                case self::GENERAL_ERROR:
                    return self::ConstructMessage($errorCode, GENERAL_ERROR_MESSAGE);
                case self::SUCCESS:
                    return self::ConstructMessage($errorCode, SUCCESS_MESSAGE);
                case self::EMAIL_INVALID:
                    return self::ConstructMessage($errorCode, EMAIL_INVALID_MESSAGE);
                case self::PASSWORD_INVALID:
                    return self::ConstructMessage($errorCode, PASSWORD_INVALID_MESSAGE);
                case self::PASSWORD_NOT_CONFIRMED:
                    return self::ConstructMessage($errorCode, PASSWORD_NOT_CONFIRMED_MESSAGE);
                case self::DISPLAY_NAME_INVALID:
                    return self::ConstructMessage($errorCode, DISPLAY_NAME_INVALID_MESSAGE);
                case self::FIRST_NAME_INVALID:
                    return self::ConstructMessage($errorCode, FIRST_NAME_INVALID_MESSAGE);
                case self::LAST_NAME_INVALID:
                    return self::ConstructMessage($errorCode, LAST_NAME_INVALID_MESSAGE);
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