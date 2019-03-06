DELIMITER $$
CREATE PROCEDURE UpdateClientProfile
(
    IN _clientProfileId INT,
    IN _profilePicture VARCHAR(2048),
    IN _biography VARCHAR(500),
    IN _eyeColourId INT,
    IN _hairColourId INT,
    IN _skinToneId INT,
    OUT _status SMALLINT
)
BEGIN
    DECLARE CLIENT_PROFILE_DOES_NOT_EXIST SMALLINT DEFAULT 1035;
    DECLARE EYE_COLOUR_ID_DOES_NOT_EXIST SMALLINT DEFAULT 1032;
    DECLARE HAIR_COLOUR_ID_DOES_NOT_EXIST SMALLINT DEFAULT 1033;
    DECLARE SKIN_TONE_ID_DOES_NOT_EXIST SMALLINT DEFAULT 1034;

    DECLARE currentProfilePicture VARCHAR(2048);
    DECLARE currentBiography VARCHAR(500);
    DECLARE currentEyeColourId INT;
    DECLARE currentHairColourId INT;
    DECLARE currentSkinToneId INT;
    DECLARE updateProfilePicture BOOLEAN DEFAULT FALSE;
    DECLARE updateBiography BOOLEAN DEFAULT FALSE;
    DECLARE updateEyeColourId BOOLEAN DEFAULT FALSE;
    DECLARE updateHairColourId BOOLEAN DEFAULT FALSE;
    DECLARE updateSkinToneId BOOLEAN DEFAULT FALSE;

    UpdateClientProfile:BEGIN
        -- Check if the client profile id given exists
        IF (_clientProfileId IS NULL OR !DoesClientProfileIdExist(_clientProfileId)) THEN
            SET _status = CLIENT_PROFILE_DOES_NOT_EXIST;
            LEAVE UpdateClientProfile;
        END IF;

        -- Check if the eye colour id given is not null and exists
        IF (_eyeColourId IS NOT NULL AND !DoesEyeColourIdExist(_eyeColourId)) THEN
            SET _status = EYE_COLOUR_ID_DOES_NOT_EXIST;
            LEAVE UpdateClientProfile;
        END IF;

        -- Check if the hair colour id given is not null and exists
        IF (_hairColourId IS NOT NULL AND !DoesHairColourIdExist(_hairColourId)) THEN
            SET _status = HAIR_COLOUR_ID_DOES_NOT_EXIST;
            LEAVE UpdateClientProfile;
        END IF;

        -- Check if the skin tone id given is not null and exists
        IF (_skinToneId IS NOT NULL AND !DoesSkinToneIdExist(_skinToneId)) THEN
            SET _status = SKIN_TONE_ID_DOES_NOT_EXIST;
            LEAVE UpdateClientProfile;
        END IF;

        -- Get the current values
        SELECT
            Profile_Picture_Url,
            Biography,
            Eye_Colour_Id,
            Hair_Colour_Id,
            Skin_Tone_Id
        INTO
            currentProfilePicture,
            currentBiography,
            currentEyeColourId,
            currentHairColourId,
            currentSkinToneId
        FROM
            Client_Profile
        WHERE
            Client_Profile_Id = _clientProfileId;

        -- Check if each value has changed or is null to determine if it needs to be updated
        IF (currentProfilePicture != _profilePicture AND _profilePicture IS NOT NULL) THEN
            SET updateProfilePicture = TRUE;
        END IF;

        IF (currentBiography != _biography AND _biography IS NOT NULL) THEN
            SET updateBiography = TRUE;
        END IF;

        IF (currentEyeColourId != _eyeColourId AND _eyeColourId IS NOT NULL) THEN
            SET updateEyeColourId = TRUE;
        END IF;

        IF (currentHairColourId != _hairColourId AND _hairColourId IS NOT NULL) THEN
            SET updateHairColourId = TRUE;
        END IF;

        IF (currentSkinToneId != _skinToneId AND _skinToneId IS NOT NULL) THEN
            SET updateSkinToneId = TRUE;
        END IF;

        -- Update the user info
        UPDATE
            Client_Profile
        SET
            Profile_Picture_Url = CASE WHEN updateProfilePicture = TRUE THEN _profilePicture ELSE currentProfilePicture END,
            Biography = CASE WHEN updateBiography = TRUE THEN _biography ELSE currentBiography END,
            Eye_Colour_Id = CASE WHEN updateEyeColourId = TRUE THEN _eyeColourId ELSE currentEyeColourId END,
            Hair_Colour_Id = CASE WHEN updateHairColourId = TRUE THEN _hairColourId ELSE currentHairColourId END,
            Skin_Tone_Id = CASE WHEN updateSkinToneId = TRUE THEN _skinToneId ELSE currentSkinToneId END
        WHERE
            Client_Profile_Id = _clientProfileId;

        SET _status = 0;
    END;
END
$$
DELIMITER ;