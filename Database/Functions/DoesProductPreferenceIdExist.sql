DELIMITER $$
CREATE FUNCTION DoesProductPreferenceIdExist
(
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
                Product_Preference_Id
            FROM
                Product_Preference
            WHERE
                Product_Preference_Id = _productPreferenceId
        )
    ) THEN 
        RETURN FALSE;
    END IF;

    RETURN TRUE;
END
$$
DELIMITER ;
