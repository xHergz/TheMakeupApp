DELIMITER $$
CREATE PROCEDURE GetProductPreferences
(
    IN _displayName VARCHAR(50),
    OUT _status SMALLINT
)
BEGIN
    DECLARE CLIENT_PROFILE_DOES_NOT_EXIST SMALLINT DEFAULT 1035;

    DECLARE clientProfileId INT DEFAULT NULL;

    GetProductPreferences:BEGIN
        SET clientProfileId = GetClientProfileIdByDisplayName(_displayName);

        -- Check if the client profile exists
		IF (!DoesClientProfileIdExist(clientProfileId)) THEN
			SET _status = CLIENT_PROFILE_DOES_NOT_EXIST;
			LEAVE GetProductPreferences;
		END IF;

        SET _status = 0;
    END;

    SELECT
        Product_Preference_Id,
        Description AS Product_Preference_Description
    FROM
        Product_Preference
    WHERE
        Client_Profile_Id = clientProfileId
        OR Client_Profile_Id IS NULL;
END
$$
DELIMITER ;