DELIMITER $$
CREATE PROCEDURE GetAllergiesAndSensitivities
(
    IN _clientProfileId INT,
    OUT _status SMALLINT
)
BEGIN
    DECLARE CLIENT_PROFILE_DOES_NOT_EXIST SMALLINT DEFAULT 1035;

    GetAllergiesAndSensitivities:BEGIN
        -- Check if the client profile exists
		IF (!DoesClientProfileIdExist(_clientProfileId)) THEN
			SET _status = CLIENT_PROFILE_DOES_NOT_EXIST;
			LEAVE GetAllergiesAndSensitivities;
		END IF;

        SET _status = 0;
    END;

    SELECT
        Allergy_Sensitivity_Id,
        Description
    FROM
        Allergy_Sensitivity
    WHERE
        Client_Profile_Id = _clientProfileId
        OR Client_Profile_Id IS NULL;
END
$$
DELIMITER ;