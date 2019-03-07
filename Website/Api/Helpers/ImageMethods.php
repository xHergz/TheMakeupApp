<?php
    require_once __DIR__.'/../Common/Log.php';
    require_once __DIR__.'/../Data/Base64ImageUpload.php';

    function UploadClientProfileImage($imageData, $userId) {
        $uploadPath = "/images/users/${userId}/profile/";
        return UploadImage($imageData, $uploadPath);
    }

    function UploadImage($imageData, $path) {
        $image = new Base64ImageUpload($imageData);
        Log::LogInformation("Attempting to upload an image with Type '" . $image->Type . "' to path '" . $path . "'");

        if (!IsValidImage($image->Type)) {
            Log::LogError("Invalid image type: " . $image->Type);
            return null;
        }

        // Generate unique file name
        $uniqueFileName = uniqid();
        $imagePath = $path . $uniqueFileName . GetFileExtension($image->Type);
        $systemFolderPath = $_SERVER["DOCUMENT_ROOT"] . $path;
        $fullSystemPath = $_SERVER["DOCUMENT_ROOT"] . $imagePath;

        // Check for naming collisions, should be unlikely but not garunteed to be unique
        if (file_exists($fullSystemPath)) {
            Log::LogError("File with same path already exists: " . $imagePath);
            return null;
        }

        // Make sure the folders exist
        if (!file_exists($systemFolderPath)) {
            mkdir($systemFolderPath, 0777, true);
        }
        
        // Upload the image
        $data = base64_decode($image->Data);
        file_put_contents($fullSystemPath, $data);
        Log::LogInformation("Successfully uploaded an image to '" . $imagePath . "'");
        return $imagePath;
    }

    function IsValidImage($imageType) {
        switch($imageType) {
            case "image/jpeg":
            case "image/png":
                return true;
            default:
                return false;
        }
    }

    function GetFileExtension($imageType) {
        switch($imageType) {
            case "image/jpeg":
                return ".jpeg";
            case "image/png":
                return ".png";
            default:
                return ".jpeg";
        }
    }

?>