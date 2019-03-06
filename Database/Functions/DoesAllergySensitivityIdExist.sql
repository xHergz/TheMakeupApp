DELIMITER $$
CREATE FUNCTION DoesAllergySensitivityIdExist
(
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
                Allergy_Sensitivity_Id
            FROM
                Allergy_Sensitivity
            WHERE
                Allergy_Sensitivity_Id = _allergySensitivityId
        )
    ) THEN 
        RETURN FALSE;
    END IF;

    RETURN TRUE;
END
$$
DELIMITER ;
