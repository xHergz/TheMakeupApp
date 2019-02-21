DELIMITER $$
CREATE FUNCTION DoesUserEmailExist
(
	_email VARCHAR(256)
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
                Email
            FROM
                User
            WHERE
                Email = _email
        )
    ) THEN 
        RETURN FALSE;
    END IF;

    RETURN TRUE;
END
$$
DELIMITER ;
