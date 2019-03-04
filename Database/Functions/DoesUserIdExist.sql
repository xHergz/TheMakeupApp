DELIMITER $$
CREATE FUNCTION DoesUserIdExist
(
	_userId INT
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
                User_Id
            FROM
                User
            WHERE
                User_Id = _userId
        )
    ) THEN 
        RETURN FALSE;
    END IF;

    RETURN TRUE;
END
$$
DELIMITER ;
