DELIMITER $$
CREATE PROCEDURE GetAllergiesAndSensitivities
(
    IN _displayName VARCHAR(50),
    OUT _status SMALLINT
)
BEGIN
    DECLARE CLIENT_PROFILE_DOES_NOT_EXIST SMALLINT DEFAULT 1035;

    DECLARE clientProfileId INT DEFAULT NULL;

    GetAllergiesAndSensitivities:BEGIN
        SET clientProfileId = GetClientProfileIdByDisplayName(_displayName);

        -- Check if the client profile exists
		IF (!DoesClientProfileIdExist(clientProfileId)) THEN
			SET _status = CLIENT_PROFILE_DOES_NOT_EXIST;
			LEAVE GetAllergiesAndSensitivities;
		END IF;

        SET _status = 0;
    END;

    SELECT
        Allergy_Sensitivity_Id,
        Description AS Allergy_Sensitivity_Description
    FROM
        Allergy_Sensitivity
    WHERE
        Client_Profile_Id = clientProfileId
        OR Client_Profile_Id IS NULL;
END
$$
DELIMITER ;