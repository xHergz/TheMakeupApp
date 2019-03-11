DELIMITER $$
CREATE FUNCTION DoesSessionOwnArtistPortfolio
(
	_sessionKey VARCHAR(256),
    _artistPortfolioId INT
)
RETURNS SMALLINT
READS SQL DATA
NOT DETERMINISTIC
BEGIN
    DECLARE artistPortfolioLinkedToSession INT;

    SET artistPortfolioLinkedToSession = GetArtistPortfolioIdBySessionKey(_sessionKey);

    IF (artistPortfolioLinkedToSession = _artistPortfolioId) THEN
        RETURN TRUE;
    END IF;

    RETURN FALSE;
END
$$
DELIMITER ;
