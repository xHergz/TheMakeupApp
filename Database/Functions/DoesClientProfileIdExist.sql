DELIMITER $$
CREATE FUNCTION DoesClientProfileIdExist
(
	_clientProfileId INT
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
                Client_Profile_Id
            FROM
                Client_Profile
            WHERE
                Client_Profile_Id = _clientProfileId
        )
    ) THEN 
        RETURN FALSE;
    END IF;

    RETURN TRUE;
END
$$
DELIMITER ;
