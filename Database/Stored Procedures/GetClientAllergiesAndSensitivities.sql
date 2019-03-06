DELIMITER $$
CREATE PROCEDURE GetClientAllergiesAndSensitivities
(
    IN _displayName VARCHAR(50),
    OUT _status SMALLINT
)
BEGIN
    DECLARE DISPLAY_NAME_DOES_NOT_EXIST SMALLINT DEFAULT 1004;

    DECLARE clientProfileId INT;

    GetClientAllergiesAndSensitivities:BEGIN
        -- Check if the display name exists
		IF (!DoesUserDisplayNameExist(_displayName)) THEN
			SET _status = DISPLAY_NAME_DOES_NOT_EXIST;
			LEAVE GetClientAllergiesAndSensitivities;
		END IF;

        SET clientProfileId = GetClientProfileIdByDisplayName(_displayName);
        SET _status = 0;
    END;

    SELECT
        Client_Allergy_Sensitivity.Allergy_Sensitivity_Id,
        Allergy_Sensitivity.Description,
        Client_Allergy_Sensitivity.Client_Profile_Id
    FROM
        Client_Allergy_Sensitivity
        INNER JOIN Allergy_Sensitivity ON Allergy_Sensitivity.Allergy_Sensitivity_Id = Client_Allergy_Sensitivity.Allergy_Sensitivity_Id
    WHERE
        Client_Allergy_Sensitivity.Client_Profile_Id = clientProfileId;

END
$$
DELIMITER ;