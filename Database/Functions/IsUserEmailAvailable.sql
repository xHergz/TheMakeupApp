DELIMITER $$
CREATE FUNCTION IsUserEmailAvailable
(
	_email VARCHAR(256)
)
RETURNS SMALLINT
BEGIN
    IF
    (
        NOT EXISTS
        (
            SELECT
                Email
            FROM
                User
            WHERE
                Email = _email
        )
    ) THEN 
        RETURN TRUE;
    END IF;

    RETURN FALSE;
END
$$
DELIMITER ;
