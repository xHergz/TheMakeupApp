DELIMITER $$
CREATE FUNCTION DoesClientHeadshotIdExist
(
	_clientHeadshotId INT
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
                Client_Headshot_Id
            FROM
                Client_Headshot
            WHERE
                Client_Headshot_Id = _clientHeadshotId
        )
    ) THEN 
        RETURN FALSE;
    END IF;

    RETURN TRUE;
END
$$
DELIMITER ;
