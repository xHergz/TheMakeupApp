<?php
    require_once __DIR__.'/../Common/Validation.php';
    require_once __DIR__.'/Errors.php';

    class ClientProfile {
        public $ClientProfileId;

        public $UserId;

        public $ProfilePictureUrl;

        public $Biography;

        public $EyeColourId;

        public $HairColourId;

        public $SkinToneId;

        public function __construct($clientProfileId, $userId, $profilePictureUrl, $biography, $eyeColourId, $hairColourId, $skinToneId) {
            $this->ClientProfileId = $clientProfileId == '' ? null : $clientProfileId;
            $this->UserId = $userId == '' ? null : $userId;
            $this->ProfilePictureUrl = $profilePictureUrl == '' ? null : $profilePictureUrl;
            $this->Biography = $biography == '' ? null : $biography;
            $this->EyeColourId = $eyeColourId == '' ? null : $eyeColourId;
            $this->HairColourId = $hairColourId == '' ? null : $hairColourId;
            $this->SkinToneId = $skinToneId == '' ? null : $skinToneId;
        }

        public function GetCreateErrors() {
            $errorCodes = array();

            if ($this->Biography == null || !$this->IsBiographyValid()) {
                array_push($errorCodes, Errors::BIOGRAPHY_INVALID);
            }

            if ($this->EyeColourId == null || !$this->IsEyeColourIdValid()) {
                array_push($errorCodes, Errors::EYE_COLOUR_ID_INVALID);
            }

            if ($this->HairColourId == null || !$this->IsHairColourIdValid()) {
                array_push($errorCodes, Errors::HAIR_COLOUR_ID_INVALID);
            }

            if ($this->SkinToneId == null || !$this->IsSkinToneIdValid()) {
                array_push($errorCodes, Errors::SKIN_TONE_ID_INVALID);
            }

            return $errorCodes;
        }

        public function GetUpdateErrors() {
            $errorCodes = array();

            if ($this->Biography != null && !$this->IsBiographyValid()) {
                array_push($errorCodes, Errors::BIOGRAPHY_INVALID);
            }

            if ($this->EyeColourId != null && !$this->IsEyeColourIdValid()) {
                array_push($errorCodes, Errors::EYE_COLOUR_ID_INVALID);
            }

            if ($this->HairColourId != null && !$this->IsHairColourIdValid()) {
                array_push($errorCodes, Errors::HAIR_COLOUR_ID_INVALID);
            }

            if ($this->SkinToneId != null && !$this->IsSkinToneIdValid()) {
                array_push($errorCodes, Errors::SKIN_TONE_ID_INVALID);
            }

            return $errorCodes;
        }

        private function IsBiographyValid() {
            return Validation::ValidateBiography($this->Biography);
        }

        private function IsEyeColourIdValid() {
            return Validation::ValidateNumber($this->EyeColourId);
        }

        private function IsHairColourIdValid() {
            return Validation::ValidateNumber($this->HairColourId);
        }

        private function IsSkinToneIdValid() {
            return Validation::ValidateNumber($this->SkinToneId);
        }
    }
?>