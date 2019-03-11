DELIMITER $$
CREATE FUNCTION DoesArtistServiceIdExist
(
	_artistServiceId INT
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
                Artist_Service.Artist_Service_Id
            FROM
                Artist_Service
            WHERE
                Artist_Service.Artist_Service_Id = _artistServiceId
        )
    ) THEN 
        RETURN FALSE;
    END IF;

    RETURN TRUE;
END
$$
DELIMITER ;
