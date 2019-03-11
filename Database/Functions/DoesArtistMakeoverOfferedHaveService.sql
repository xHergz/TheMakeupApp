DELIMITER $$
CREATE FUNCTION DoesArtistMakeoverOfferedHaveService
(
	_artistMakeoverOfferedId INT,
    _serviceTypeId INT
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
                Artist_Service.Artist_Makeover_Offered_Id = _artistMakeoverOfferedId
                AND Artist_Service.Service_Type_Id = _serviceTypeId
        )
    ) THEN 
        RETURN FALSE;
    END IF;

    RETURN TRUE;
END
$$
DELIMITER ;
