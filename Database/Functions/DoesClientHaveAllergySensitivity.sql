DELIMITER $$
CREATE FUNCTION DoesClientHaveAllergySensitivity
(
	_clientProfileId INT,
    _allergySensitivityId INT
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
                Allergy_Sensitivity_Id
            FROM
                Client_Allergy_Sensitivity
            WHERE
                Client_Profile_Id = _clientProfileId
                AND Allergy_Sensitivity_Id = _allergySensitivityId
        )
    ) THEN 
        RETURN FALSE;
    END IF;

    RETURN TRUE;
END
$$
DELIMITER ;
