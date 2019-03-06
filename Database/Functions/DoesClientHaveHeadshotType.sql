DELIMITER $$
CREATE FUNCTION DoesClientHaveHeadshotType
(
	_clientProfileId INT,
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
                Client_Headshot_Id
            FROM
                Client_Headshot
            WHERE
                Client_Profile_Id = _clientProfileId
                AND Headshot_Type_Id = _headshotTypeId
        )
    ) THEN 
        RETURN FALSE;
    END IF;

    RETURN TRUE;
END
$$
DELIMITER ;
