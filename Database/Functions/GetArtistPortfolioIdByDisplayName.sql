DELIMITER $$
CREATE FUNCTION GetArtistPortfolioIdByDisplayName
(
	_displayName VARCHAR(50)
)
RETURNS INT
READS SQL DATA
NOT DETERMINISTIC
BEGIN
    DECLARE artistPortfolioId INT DEFAULT NULL;

    SELECT
        Artist_Portfolio.Artist_Portfolio_Id
    INTO
        artistPortfolioId
    FROM
        Artist_Portfolio
        INNER JOIN User ON User.User_Id = Artist_Portfolio.User_Id
    WHERE
        User.Display_Name = _displayName;

    RETURN artistPortfolioId;
END
$$
DELIMITER ;
