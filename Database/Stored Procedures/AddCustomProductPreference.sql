DELIMITER $$
CREATE PROCEDURE AddCustomProductPreference
(
    IN _clientProfileId INT,
    IN _description VARCHAR(100),
    OUT _status SMALLINT
)
BEGIN
    DECLARE CLIENT_PROFILE_DOES_NOT_EXIST SMALLINT DEFAULT 1035;

    AddCustomProductPreference:BEGIN
        -- Check if the client profile exists
		IF (!DoesClientProfileIdExist(_clientProfileId)) THEN
			SET _status = CLIENT_PROFILE_DOES_NOT_EXIST;
			LEAVE AddCustomProductPreference;
		END IF;

        INSERT INTO Product_Preference(Description, Client_Profile_Id) VALUES
        (_description, _clientProfileId);
        SET _status = 0;
    END;
END
$$
DELIMITER ;