DELIMITER $$
CREATE FUNCTION IsArtistOnline
(
	_artistPortfolioId INT
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
                Artist_Portfolio_Id
            FROM
                Online_Artist
            WHERE
                Artist_Portfolio_Id = _artistPortfolioId
        )
    ) THEN 
        RETURN FALSE;
    END IF;

    RETURN TRUE;
END
$$
DELIMITER ;
