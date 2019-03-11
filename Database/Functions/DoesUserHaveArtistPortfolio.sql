DELIMITER $$
CREATE FUNCTION DoesUserHaveArtistPortfolio
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
                Artist_Portfolio.Artist_Portfolio_Id
            FROM
                Artist_Portfolio
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
