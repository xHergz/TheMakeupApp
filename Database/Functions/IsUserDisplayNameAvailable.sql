DELIMITER $$
CREATE FUNCTION IsUserDisplayNameAvailable
(
	_displayName VARCHAR(50)
)
RETURNS SMALLINT
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
        RETURN TRUE;
    END IF;

    RETURN FALSE;
END
$$
DELIMITER ;
