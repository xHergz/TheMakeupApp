DELIMITER $$
CREATE FUNCTION DoesArtistOfferMakeoverIdExist
(
	_artistPortfolioId INT,
    _makeoverTypeId INT
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
                Artist_Makeover_Offered.Artist_Portfolio_Id = _artistPortfolioId
                AND Artist_Makeover_Offered.Makeover_Type_Id = _makeoverTypeId
        )
    ) THEN 
        RETURN FALSE;
    END IF;

    RETURN TRUE;
END
$$
DELIMITER ;
