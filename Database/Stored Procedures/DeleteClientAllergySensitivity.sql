DELIMITER $$
CREATE PROCEDURE DeleteClientAllergySensitivity
(
    IN _clientProfileId INT,
    IN _allergySensitivityId INT,
    OUT _status SMALLINT
)
BEGIN
    DECLARE CLIENT_ALLERGY_SENSITIVITY_DOES_NOT_EXIST SMALLINT DEFAULT 1044;

    DeleteClientAllergySensitivity:BEGIN
        -- Check if the client allergy sensitivity exists
        IF (!DoesClientHaveAllergySensitivity(_clientProfileId, _allergySensitivityId)) THEN
            SET _status = CLIENT_ALLERGY_SENSITIVITY_DOES_NOT_EXIST;
            LEAVE DeleteClientAllergySensitivity;
        END IF;

        -- Delete the entry
        DELETE FROM
            Client_Allergy_Sensitivity
        WHERE
            Client_Profile_Id = _clientProfileId
            AND Allergy_Sensitivity_Id = _allergySensitivityId;
        
        SET _status = 0;
    END;
END
$$
DELIMITER ;