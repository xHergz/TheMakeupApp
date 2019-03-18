<?php
    require_once __DIR__. "/Utilities.php";    

    define("WindowsLogDirectory", "C:\\xampp\apache\logs");
    define("LinuxLogDirectory", "/var/hergbot/TheMakeupApp");
    define("FileName", "TheMakeupAppApi");

    class Log {
        public static function LogRequest($methodName, $parameters) {
            self::CheckIfFolderExists();
            $message = self::GetTimestamp()."[RQT] API Request to '".$methodName."' with parameters: '".http_build_query($parameters,'',', ')."'\n";
            self::LogMessage($message);
        }

        public static function LogError($message) {
            self::CheckIfFolderExists();
            $message = self::GetTimestamp()."[ERR] ".$message."\n";
            self::LogMessage($message);
        }

        public static function LogInformation($message) {
            self::CheckIfFolderExists();
            $message = self::GetTimestamp()."[INF] ".$message."\n";
            self::LogMessage($message);
        }

        private static function GetDirectory() {
            if (IsWindows()) {
                return WindowsLogDirectory;
            }
            return LinuxLogDirectory;
        }

        private static function GetLogFilePath() {
            if (IsWindows()) {
                return WindowsLogDirectory."\\".FileName.".txt";
            }
            return LinuxLogDirectory."/".FileName."_".date("Y-m-d").".txt";
        }

        private static function CheckIfFolderExists() {
            $directory = self::GetDirectory();
            if(!file_exists($directory) && is_dir($directory)) {
                mkdir($directory, 0755, true);
            }
        }

        private static function GetTimestamp() {
            return '['.date("Y-m-d H:i:s").']';
        }

        private static function LogMessage($message) {
            file_put_contents(self::GetLogFilePath(), $message, FILE_APPEND | LOCK_EX);
        }
    }
?>