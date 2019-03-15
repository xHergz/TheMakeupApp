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
    define("NO_SESSION_KEY_MESSAGE", "No session key set");
    define("INVALID_SESSION_KEY_MESSAGE", "Session key is invalid");
    define("EMAIL_UNAVAILABLE_MESSAGE", "Email Unavailable");
    define("DISPLAY_NAME_UNAVAILABLE_MESSAGE", "Display Name Unavailable");
    define("EMAIL_DOES_NOT_EXIST_MESSAGE", "Email Does Not Exist");
    define("DISPLAY_NAME_DOES_NOT_EXIST_MESSAGE", "Display Name Does Not Exist");
    define("USER_ID_DOES_NOT_EXIST_MESSAGE", "User Id Does Not Exist");
    define("USER_DOES_NOT_BELONG_TO_SESSION_MESSAGE", "User does not belong to session");
    define("CLIENT_PROFILE_DOES_NOT_BELONG_TO_SESSION_MESSAGE", "Client does not belong to session");
    define("USER_IS_NOT_ARTIST_MESSAGE", "User is not artist");
    define("REQUESTER_SESSION_KEY_INVALID_MESSAGE", "Requester session key is invalid");
    define("QUERIED_SESSION_KEY_INVALID_MESSAGE", "Queried session key is invalid");
    define("SESSION_KEY_NOT_AUTHORIZED_FOR_SESSION_MESSAGE", "Session key not authorized for session");

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
        public const NO_SESSION_KEY = 21;
        public const INVALID_SESSION_KEY = 22;
        public const BIOGRAPHY_INVALID = 31;
        public const EYE_COLOUR_ID_INVALID = 32;
        public const HAIR_COLOUR_ID_INVALID = 33;
        public const SKIN_TONE_ID_INVALID = 34;
        public const RATING_INVALID = 35;
        public const REVIEW_INVALID = 36;
        public const SESSION_KEY_DOES_NOT_EXIST = 101;
        public const SESSION_KEY_IS_NOT_ACTIVE = 101;
        public const SESSION_KEY_EXPIRED = 101;
        public const USER_IS_NOT_ACTIVE = 101;
        public const EMAIL_UNAVAILABLE = 1001;
        public const DISPLAY_NAME_UNAVAILABLE = 1002;
        public const EMAIL_DOES_NOT_EXIST = 1003;
        public const DISPLAY_NAME_DOES_NOT_EXIST = 1004;
        public const USER_ID_DOES_NOT_EXIST = 1005;
        public const USER_DOES_NOT_BELONG_TO_SESSION = 1011;
        public const CLIENT_PROFILE_DOES_NOT_BELONG_TO_SESSION = 1012;
        public const USER_IS_NOT_ARTIST = 1013;
        public const CLIENT_HEADSHOT_DOES_NOT_BELONG_TO_SESSION = 1014;
        public const CLIENT_REVIEW_DOES_NOT_BELONG_TO_SESSION = 1015;
        public const REQUESTER_SESSION_KEY_INVALID = 1021;
        public const QUERIED_SESSION_KEY_INVALID = 1022;
        public const SESSION_KEY_NOT_AUTHORIZED_FOR_SESSION = 1023;
        public const SESSION_KEY_NOT_AUTHORIZED_FOR_MAKEOVER_APPOINTMENT = 1024;
        public const CLIENT_PROFILE_ALREADY_EXISTS = 1031;
        public const EYE_COLOUR_ID_DOES_NOT_EXIST = 1032;
        public const HAIR_COLOUR_ID_DOES_NOT_EXIST = 1033;
        public const SKIN_TONE_ID_DOES_NOT_EXIST = 1034;
        public const CLIENT_PROFILE_DOES_NOT_EXIST = 1035;
        public const ALLERGY_SENSITIVITY_DOES_NOT_EXIST = 1036;
        public const CLIENT_ALLERGY_SENSITIVTY_ALREADY_EXISTS = 1037;
        public const HEADSHOT_TYPE_ID_DOES_NOT_EXIST = 1038;
        public const CLIENT_HEADSHOT_ALREADY_EXISTS = 1039;
        public const PRODUCT_PREFERENCE_DOES_NOT_EXIST = 1040;
        public const CLIENT_PRODUCT_PREFERENCE_ALREADY_EXISTS = 1041;
        public const ARTIST_PORTFOLIO_DOES_NOT_EXIST = 1042;
        public const CLIENT_REVIEW_DOES_NOT_EXIST = 1043;
        public const CLIENT_ALLERGY_SENSITIVITY_DOES_NOT_EXIST = 1044;
        public const CLIENT_HEADSHOT_DOES_NOT_EXIST = 1045;
        public const CLIENT_PRODUCT_PREFERENCE_DOES_NOT_EXIST = 1046;
        public const SANITIZATION_QUIZ_QUESTION_ID_DOES_NOT_EXIST = 1050;
        public const SANITIZATION_QUIZ_ANSWER_ID_DOES_NOT_EXIST = 1051;
        public const SANITIZATION_QUIZ_ANSWER_DOES_NOT_BELONG_TO_QUESTION = 1052;
        public const ARTIST_APPLICATION_ID_DOES_NOT_EXIST = 1060;
        public const ARTIST_PORTFOLIO_ID_DOES_NOT_EXIST = 1070;
        public const ARTIST_PORTFOLIO_ALREADY_EXISTS = 1071;
        public const ARTIST_PORTFOLIO_DOES_NOT_BELONG_TO_SESSION = 1072;
        public const MAKEOVER_TYPE_ID_DOES_NOT_EXIST = 1080;
        public const ARTIST_PORTFOLIO_PICTURE_ID_DOES_NOT_EXIST = 1090;
        public const ARTIST_PORTFOLIO_PICTURE_DOES_NOT_BELONG_TO_SESSION = 1091;
        public const ARTIST_QUALIFICATION_ID_DOES_NOT_EXIST = 2000;
        public const ARTIST_QUALIFICATION_DOES_NOT_BELONG_TO_SESSION = 2001;
        public const ARTIST_MAKEOVER_OFFERED_ID_DOES_NOT_EXIST = 2010;
        public const ARTIST_MAKEOVER_OFFERED_ALREADY_EXISTS = 2011;
        public const ARTIST_MAKEOVER_OFFERED_DOES_NOT_BELONG_TO_SESSION = 2012;
        public const SERVICE_TYPE_ID_DOES_NOT_EXIST = 2020;
        public const ARTIST_SERVICE_ID_DOES_NOT_EXIST = 2030;
        public const ARTIST_SERVICE_ALREADY_EXISTS = 2031;
        public const ARTIST_SERVICE_DOES_NOT_BELONG_TO_SESSION= 2032;
        public const ARTIST_SERVICE_ADDON_ID_DOES_NOT_EXIST = 2040;
        public const ARTIST_SERVICE_ADDON_DOES_NOT_BELONG_TO_SESSION = 2041;
        public const CONSULTATION_TYPE_ID_DOES_NOT_EXIST = 2050;
        public const ARTIST_SERVICE_CONSULTATION_ID_DOES_NOT_EXIST = 2060;
        public const ARTIST_SERVICE_CONSULTATION_ALREADY_EXISTS = 2061;
        public const ARTIST_SERVICE_CONSULTATION_DOES_NOT_BELONG_TO_SESSION = 2062;

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
                case self::NO_SESSION_KEY:
                    return self::ConstructMessage($errorCode, NO_SESSION_KEY_MESSAGE);
                case self::INVALID_SESSION_KEY:
                    return self::ConstructMessage($errorCode, INVALID_SESSION_KEY_MESSAGE);
                case self::EMAIL_UNAVAILABLE:
                    return self::ConstructMessage($errorCode, EMAIL_UNAVAILABLE_MESSAGE);
                case self::DISPLAY_NAME_UNAVAILABLE:
                    return self::ConstructMessage($errorCode, DISPLAY_NAME_UNAVAILABLE_MESSAGE);
                case self::EMAIL_DOES_NOT_EXIST:
                    return self::ConstructMessage($errorCode, EMAIL_DOES_NOT_EXIST_MESSAGE);
                case self::DISPLAY_NAME_DOES_NOT_EXIST:
                    return self::ConstructMessage($errorCode, DISPLAY_NAME_DOES_NOT_EXIST_MESSAGE);
                case self::USER_ID_DOES_NOT_EXIST:
                    return self::ConstructMessage($errorCode, USER_ID_DOES_NOT_EXIST_MESSAGE);
                case self::USER_DOES_NOT_BELONG_TO_SESSION:
                    return self::ConstructMessage($errorCode, USER_DOES_NOT_BELONG_TO_SESSION_MESSAGE);
                case self::CLIENT_PROFILE_DOES_NOT_BELONG_TO_SESSION:
                    return self::ConstructMessage($errorCode, CLIENT_PROFILE_DOES_NOT_BELONG_TO_SESSION_MESSAGE);
                case self::USER_IS_NOT_ARTIST:
                    return self::ConstructMessage($errorCode, USER_IS_NOT_ARTIST_MESSAGE);
                case self::REQUESTER_SESSION_KEY_INVALID:
                    return self::ConstructMessage($errorCode, REQUESTER_SESSION_KEY_INVALID_MESSAGE);
                case self::QUERIED_SESSION_KEY_INVALID:
                    return self::ConstructMessage($errorCode, QUERIED_SESSION_KEY_INVALID_MESSAGE);
                case self::SESSION_KEY_NOT_AUTHORIZED_FOR_SESSION:
                    return self::ConstructMessage($errorCode, SESSION_KEY_NOT_AUTHORIZED_FOR_SESSION_MESSAGE);
                default:
                    return self::ConstructMessage($errorCode, UNKNOWN_ERROR_MESSAGE);
            }   
        }

        private static function ConstructMessage($code, $message) {
            return $message." (".$code.")";
        }
    }
?>