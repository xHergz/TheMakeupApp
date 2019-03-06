DELIMITER $$
CREATE PROCEDURE AddClientAllergySensitivity
(
    IN _clientProfileId INT,
    IN _allergySensitivityId INT,
    OUT _status SMALLINT
)
BEGIN
    DECLARE CLIENT_PROFILE_DOES_NOT_EXIST SMALLINT DEFAULT 1035;
    DECLARE ALLERGY_SENSITIVITY_DOES_NOT_EXIST SMALLINT DEFAULT 1036;
    DECLARE CLIENT_ALLERGY_SENSITIVITY_ALREADY_EXISTS SMALLINT DEFAULT 1037;

    AddClientAllergySensitivity:BEGIN
        -- Check if the client profile exists
		IF (!DoesClientProfileIdExist(_clientProfileId)) THEN
			SET _status = CLIENT_PROFILE_DOES_NOT_EXIST;
			LEAVE AddClientAllergySensitivity;
		END IF;

        -- Check if the allergy sensitivity exists
		IF (!DoesAllergySensitivityIdExist(_allergySensitivityId)) THEN
			SET _status = CLIENT_PROFILE_DOES_NOT_EXIST;
			LEAVE AddClientAllergySensitivity;
		END IF;

        -- Check if the client allergy sensitivity already exists
		IF (DoesClientHaveAllergySensitivity(_clientProfileId, _allergySensitivityId)) THEN
			SET _status = CLIENT_ALLERGY_SENSITIVITY_ALREADY_EXISTS;
			LEAVE AddClientAllergySensitivity;
		END IF;

        INSERT INTO Client_Allergy_Sensitivity(Client_Profile_Id, Allergy_Sensitivity_Id) VALUES
        (_clientProfileId, _allergySensitivityId);
        SET _status = 0;
    END;
END
$$
DELIMITER ;