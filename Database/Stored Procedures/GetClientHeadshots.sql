DELIMITER $$
CREATE PROCEDURE GetClientHeadshots
(
    IN _displayName VARCHAR(50),
    OUT _status SMALLINT
)
BEGIN
    DECLARE DISPLAY_NAME_DOES_NOT_EXIST SMALLINT DEFAULT 1004;

    DECLARE clientProfileId INT;

    GetClientHeadshots:BEGIN
        -- Check if the display name exists
		IF (!DoesUserDisplayNameExist(_displayName)) THEN
			SET _status = DISPLAY_NAME_DOES_NOT_EXIST;
			LEAVE GetClientHeadshots;
		END IF;

        SET clientProfileId = GetClientProfileIdByDisplayName(_displayName);
        SET _status = 0;
    END;

    SELECT
        Client_Headshot.Client_Headshot_Id,
        Headshot_Type.Headshot_Type_Id,
        Headshot_Type.Description,
        Client_Headshot.Client_Profile_Id,
        Client_Headshot.Image_Url
    FROM
        Headshot_Type
        LEFT JOIN Client_Headshot ON Headshot_Type.Headshot_Type_Id = Client_Headshot.Headshot_Type_Id
            AND client_headshot.Client_Headshot_Id = clientProfileId;
END
$$
DELIMITER ;