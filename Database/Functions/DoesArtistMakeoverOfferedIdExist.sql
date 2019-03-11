DELIMITER $$
CREATE FUNCTION DoesArtistMakeoverOfferedIdExist
(
	_artistMakeoverOfferedId INT
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
                Artist_Makeover_Offered.Artist_Makeover_Offered_Id
            FROM
                Artist_Makeover_Offered
            WHERE
                Artist_Makeover_Offered.Artist_Makeover_Offered_Id = _artistMakeoverOfferedId
        )
    ) THEN 
        RETURN FALSE;
    END IF;

    RETURN TRUE;
END
$$
DELIMITER ;
