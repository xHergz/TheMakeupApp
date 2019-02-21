DELIMITER $$
CREATE FUNCTION DoesUserDisplayNameExist
(
	_displayName VARCHAR(50)
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
                Display_Name
            FROM
                User
            WHERE
                Display_Name = _displayName
        )
    ) THEN 
        RETURN FALSE;
    END IF;

    RETURN TRUE;
END
$$
DELIMITER ;
