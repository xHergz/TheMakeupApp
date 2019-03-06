DELIMITER $$
CREATE PROCEDURE GetClientProfile
(
    IN _displayName VARCHAR(50),
    OUT _status SMALLINT
)
BEGIN
    DECLARE DISPLAY_NAME_DOES_NOT_EXIST SMALLINT DEFAULT 1004;

    DECLARE clientProfileId INT;

    GetClientProfile:BEGIN
        -- Check if the display name exists
		IF (!DoesUserDisplayNameExist(_displayName)) THEN
			SET _status = DISPLAY_NAME_DOES_NOT_EXIST;
			LEAVE GetClientProfile;
		END IF;

        SET clientProfileId = GetClientProfileIdByDisplayName(_displayName);
        SET _status = 0;
    END;

    SELECT
        Client_Profile_Id,
        Profile_Picture,
        Biography,
        Eye_Colour_Id,
        Eye_Colour.Description,
        Hair_Colour_Id,
        Hair_Colour.Description,
        Skin_Tone_Id,
        Skin_Tone.Description
    FROM
        Client_Profile
        INNER JOIN Eye_Colour ON Eye_Colour.Eye_Colour_Id = Client_Profile.Eye_Colour_Id
        INNER JOIN Hair_Colour ON Hair_Colour.Hair_Colour_Id = Client_Profile.Hair_Colour_Id
        INNER JOIN Skin_Tone ON Skin_Tone.Skin_Tone_Id = Client_Profile.Skin_Tone_Id
    WHERE
        Client_Profile.Client_Profile_Id = clientProfileId;    

END
$$
DELIMITER ;