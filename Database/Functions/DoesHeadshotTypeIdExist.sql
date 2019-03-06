DELIMITER $$
CREATE FUNCTION DoesHeadshotTypeIdExist
(
	_headshotTypeId INT
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
                Headshot_Type_Id
            FROM
                Headshot_Type
            WHERE
                Headshot_Type_Id = _headshotTypeId
        )
    ) THEN 
        RETURN FALSE;
    END IF;

    RETURN TRUE;
END
$$
DELIMITER ;
