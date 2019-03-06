DELIMITER $$
CREATE FUNCTION DoesClientHaveProductPreference
(
	_clientProfileId INT,
    _productPreferenceId INT
)
RETURNS SMALLINT
READS SQL DATA
NOT DETERMINISTIC
BEGIN
    IF
    (
        NOT EXISTS
        (
            SELECT
                Client_Profile_Id,
                Product_Preference_Id
            FROM
                Client_Product_Preference
            WHERE
                Client_Profile_Id = _clientProfileId
                AND Product_Preference_Id = _productPreferenceId
        )
    ) THEN 
        RETURN FALSE;
    END IF;

    RETURN TRUE;
END
$$
DELIMITER ;
