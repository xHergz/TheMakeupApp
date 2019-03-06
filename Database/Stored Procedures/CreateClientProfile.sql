DELIMITER $$
CREATE PROCEDURE CreateClientProfile
(
	IN _userId INT,
    IN _profilePicture VARCHAR(2048),
    IN _biography VARCHAR(500),
    IN _eyeColourId INT,
    IN _hairColourId INT,
    IN _skinToneId INT,
    OUT _status SMALLINT
)
BEGIN
    DECLARE USER_ID_DOES_NOT_EXIST SMALLINT DEFAULT 1005;
    DECLARE CLIENT_PROFILE_ALREADY_EXISTS SMALLINT DEFAULT 1031;
    DECLARE EYE_COLOUR_ID_DOES_NOT_EXIST SMALLINT DEFAULT 1032;
    DECLARE HAIR_COLOUR_ID_DOES_NOT_EXIST SMALLINT DEFAULT 1033;
    DECLARE SKIN_TONE_ID_DOES_NOT_EXIST SMALLINT DEFAULT 1034;

    CreateClientProfile:BEGIN
        -- Check if the user exists
        IF (DoesUserIdExist(_userId)) THEN
            SET _status = USER_ID_DOES_NOT_EXIST;
            LEAVE CreateClientProfile;
        END IF;

        -- Check if the user already has a client profile
        IF (DoesUserHaveClientProfile(_userId)) THEN
            SET _status = CLIENT_PROFILE_ALREADY_EXISTS;
            LEAVE CreateClientProfile;
        END IF;

        -- Check if the eye colour exists
        IF (DoesEyeColourIdExist(_eyeColourId)) THEN
            SET _status = EYE_COLOUR_ID_DOES_NOT_EXIST;
            LEAVE CreateClientProfile;
        END IF;

        -- Check if the hair colour exists
        IF (DoesHairColourIdExist(_hairColourId)) THEN
            SET _status = HAIR_COLOUR_ID_DOES_NOT_EXIST;
            LEAVE CreateClientProfile;
        END IF;

        -- Check if the skin tone exists
        IF (DoesSkinToneIdExist(_skinToneId)) THEN
            SET _status = SKIN_TONE_ID_DOES_NOT_EXIST;
            LEAVE CreateClientProfile;
        END IF;

        -- Create the client profile
        INSERT INTO Client_Profile(User_Id, Profile_Picture_Url, Biography, Eye_Colour_Id, Hair_Colour_Id, Skin_Tone_Id) VALUES
        (_userId, _profilePicture, _biography, _eyeColourId, _hairColourId, _skinToneId);
        SET _status = 0;
    END;
END
$$
DELIMITER ;