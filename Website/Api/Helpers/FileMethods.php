<?php
    require_once __DIR__.'/../Common/Log.php';
    require_once __DIR__.'/../Data/Base64FileUpload.php';

    function UploadClientProfileImage($imageData, $userId) {
        $uploadPath = "/images/users/${userId}/profile/";
        return UploadImage($imageData, $uploadPath);
    }

    function UploadClientHeadshotImage($imageData, $userId) {
        $uploadPath = "/images/users/${userId}/headshots/";
        return UploadImage($imageData, $uploadPath);
    }

    function UploadArtistApplicationResume($resumeData, $clientProfileId) {
        $uploadPath = "/documents/applications/${clientProfileId}/resumes/";
        return UploadPdf($resumeData, $uploadPath);
    }

    function UploadArtistApplicationCoverLetter($coverLetterData, $clientProfileId) {
        $uploadPath = "/documents/applications/${clientProfileId}/cover-letters/";
        return UploadPdf($coverLetterData, $uploadPath);
    }

    function UploadImage($imageData, $path) {
        $image = new Base64FileUpload($imageData);
        Log::LogInformation("Attempting to upload an image with Type '" . $image->Type . "' to path '" . $path . "'");

        if (!IsValidImage($image->Type)) {
            Log::LogError("Invalid image type: " . $image->Type);
            return null;
        }

        return UploadFile($image, $path);
    }

    function UploadPdf($fileData, $path) {
        $pdf = new Base64FileUpload($fileData);
        Log::LogInformation("Attempting to upload a PDF with Type '" . $pdf->Type . "' to path '" . $path . "'");

        if (!IsValidFile($pdf->Type)) {
            Log::LogError("Invalid file type: " . $pdf->Type);
            return null;
        }

        return UploadFile($pdf, $path);
    }

    function UploadFile($file, $path) {
        // Generate unique file name
        $uniqueFileName = uniqid();
        $filePath = $path . $uniqueFileName . GetFileExtension($file->Type);
        $systemFolderPath = $_SERVER["DOCUMENT_ROOT"] . $path;
        $fullSystemPath = $_SERVER["DOCUMENT_ROOT"] . $filePath;

        // Check for naming collisions, should be unlikely but not garunteed to be unique
        if (file_exists($fullSystemPath)) {
            Log::LogError("File with same path already exists: " . $filePath);
            return null;
        }

        // Make sure the folders exist
        if (!file_exists($systemFolderPath)) {
            mkdir($systemFolderPath, 0777, true);
        }
        
        // Upload the image
        $data = base64_decode($file->Data);
        file_put_contents($fullSystemPath, $data);
        Log::LogInformation("Successfully uploaded a file to '" . $filePath . "'");
        return $filePath;
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

    function GetFileExtension($fileType) {
        switch($fileType) {
            case "image/jpeg":
                return ".jpeg";
            case "image/png":
                return ".png";
            case "application/pdf":
                return ".pdf";
            default:
                return ".jpeg";
        }
    }

    function IsValidFile($fileType) {
        switch($fileType) {
            case "application/pdf":
                return true;
            default:
                return false;
        }
    }

?>