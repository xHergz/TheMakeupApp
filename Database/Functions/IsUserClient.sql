DELIMITER $$
CREATE FUNCTION IsUserClient
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
                Client_Profile.Client_Profile_Id
            FROM
                Client_Profile
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
