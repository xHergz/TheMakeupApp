DELIMITER $$
CREATE FUNCTION GetArtistPortfolioIdBySessionKey
(
	_sessionKey VARCHAR(256)
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
        INNER JOIN Session ON Session.User_Id = Artist_Portfolio.User_Id
    WHERE
        Session.Session_Key = _sessionKey;

    RETURN artistPortfolioId;
END
$$
DELIMITER ;
