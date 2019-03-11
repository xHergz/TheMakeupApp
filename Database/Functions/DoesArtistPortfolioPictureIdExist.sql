DELIMITER $$
CREATE FUNCTION DoesArtistPortfolioPictureIdExist
(
	_artistPortfolioPictureId INT
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
                Artist_Portfolio_Picture.Artist_Portfolio_Picture_Id
            FROM
                Artist_Portfolio_Picture
            WHERE
                Artist_Portfolio_Picture.Artist_Portfolio_Picture_Id = _artistPortfolioPictureId
        )
    ) THEN 
        RETURN FALSE;
    END IF;

    RETURN TRUE;
END
$$
DELIMITER ;
