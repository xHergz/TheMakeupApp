DELIMITER $$
CREATE PROCEDURE GetClientProductPreferences
(
    IN _displayName VARCHAR(50),
    OUT _status SMALLINT
)
BEGIN
    DECLARE DISPLAY_NAME_DOES_NOT_EXIST SMALLINT DEFAULT 1004;

    DECLARE clientProfileId INT;

    GetClientProductPreferences:BEGIN
        -- Check if the display name exists
		IF (!DoesUserDisplayNameExist(_displayName)) THEN
			SET _status = DISPLAY_NAME_DOES_NOT_EXIST;
			LEAVE GetClientProductPreferences;
		END IF;

        SET clientProfileId = GetClientProfileIdByDisplayName(_displayName);
        SET _status = 0;
    END;

    SELECT
        Client_Product_Preference.Product_Preference_Id,
        Product_Preference.Description AS Product_Preference_Description,
        Client_Product_Preference.Client_Profile_Id
    FROM
        Client_Product_Preference
        INNER JOIN Product_Preference ON Product_Preference.Product_Preference_Id = Client_Product_Preference.Product_Preference_Id
    WHERE
        Client_Product_Preference.Client_Profile_Id = clientProfileId;    

END
$$
DELIMITER ;