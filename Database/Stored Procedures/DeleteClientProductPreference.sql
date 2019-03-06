DELIMITER $$
CREATE PROCEDURE DeleteClientProductPreference
(
    IN _clientProfileId INT,
    IN _productPreferenceId INT,
    OUT _status SMALLINT
)
BEGIN
    DECLARE CLIENT_PRODUCT_PREFERENCE_DOES_NOT_EXIST SMALLINT DEFAULT 1046;

    DeleteClientProductPreference:BEGIN
        -- Check if the client product preferences exists
        IF (!DoesClientHaveProductPreference(_clientProfileId, _productPreferenceId)) THEN
            SET _status = CLIENT_PRODUCT_PREFERENCE_DOES_NOT_EXIST;
            LEAVE DeleteClientProductPreference;
        END IF;

        -- Delete the entry
        DELETE FROM
            Client_Product_Preference
        WHERE
            Client_Profile_Id = _clientProfileId
            AND Product_Preference_Id = _productPreferenceId;
        
        SET _status = 0;
    END;
END
$$
DELIMITER ;