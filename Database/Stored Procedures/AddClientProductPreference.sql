DELIMITER $$
CREATE PROCEDURE AddClientProductPreference
(
    IN _clientProfileId INT,
    IN _productPreferenceId INT,
    OUT _status SMALLINT
)
BEGIN
    DECLARE CLIENT_PROFILE_DOES_NOT_EXIST SMALLINT DEFAULT 1035;
    DECLARE PRODUCT_PREFERENCE_DOES_NOT_EXIST SMALLINT DEFAULT 1040;
    DECLARE CLIENT_PRODUCT_PREFERENCE_ALREADY_EXISTS SMALLINT DEFAULT 1041;

    AddClientProductPreference:BEGIN
        -- Check if the client profile exists
		IF (!DoesClientProfileIdExist(_clientProfileId)) THEN
			SET _status = CLIENT_PROFILE_DOES_NOT_EXIST;
			LEAVE AddClientProductPreference;
		END IF;

        -- Check if the product preference exists
		IF (!DoesProductPreferenceIdExist(_productPreferenceId)) THEN
			SET _status = PRODUCT_PREFERENCE_DOES_NOT_EXIST;
			LEAVE AddClientProductPreference;
		END IF;

        -- Check if the client product preference already exists
		IF (!DoesClientHaveProductPreference(_clientProfileId, _productPreferenceId)) THEN
			SET _status = CLIENT_PRODUCT_PREFERENCE_ALREADY_EXISTS;
			LEAVE AddClientProductPreference;
		END IF;

        INSERT INTO Client_Product_Preference(Client_Profile_Id, Product_Preference_Id) VALUES
        (_clientProfileId, _productPreferenceId);
        SET _status = 0;
    END;
END
$$
DELIMITER ;