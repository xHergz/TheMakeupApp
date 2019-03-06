DELIMITER $$
CREATE PROCEDURE AddClientHeadshot
(
    IN _clientProfileId INT,
    IN _headshotTypeId INT,
    IN _imagePath VARCHAR(2048),
    OUT _status SMALLINT
)
BEGIN
    DECLARE CLIENT_PROFILE_DOES_NOT_EXIST SMALLINT DEFAULT 1035;
    DECLARE HEADSHOT_TYPE_DOES_NOT_EXIST SMALLINT DEFAULT 1038;
    DECLARE CLIENT_HEADSHOT_ALREADY_EXISTS SMALLINT DEFAULT 1039;

    AddClientHeadshot:BEGIN
        -- Check if the client profile exists
		IF (!DoesClientProfileIdExist(_clientProfileId)) THEN
			SET _status = CLIENT_PROFILE_DOES_NOT_EXIST;
			LEAVE AddClientHeadshot;
		END IF;

        -- Check if the headshot type exists
		IF (!DoesHeadshotTypeIdExist(_headshotTypeId)) THEN
			SET _status = HEADSHOT_TYPE_DOES_NOT_EXIST;
			LEAVE AddClientHeadshot;
		END IF;

        -- Check if the client headshot already exists
		IF (!DoesClientHaveHeadshotType(_clientProfileId, _headshotTypeId)) THEN
			SET _status = CLIENT_HEADSHOT_ALREADY_EXISTS;
			LEAVE AddClientHeadshot;
		END IF;

        INSERT INTO Client_Headshot(Client_Headshot_Type_Id, Client_Profile_Id, Image_Path) VALUES
        (_headshotTypeId, _clientProfileId, _imagePath);
        SET _status = 0;
    END;
END
$$
DELIMITER ;