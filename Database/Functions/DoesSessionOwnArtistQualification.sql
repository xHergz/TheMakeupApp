DELIMITER $$
CREATE FUNCTION DoesSessionOwnArtistQualification
(
	_sessionKey VARCHAR(256),
    _artistQualificationId INT
)
RETURNS SMALLINT
READS SQL DATA
NOT DETERMINISTIC
BEGIN
    DECLARE artistPortfolioLinkedToQualification INT;

    SELECT
        Artist_Portfolio_Id
    INTO
        artistPortfolioLinkedToQualification
    FROM
        Artist_Qualification
    WHERE
        Artist_Qualification_Id = _artistQualificationId;

    RETURN DoesSessionOwnArtistPortfolio(_sessionKey, artistPortfolioLinkedToQualification);
END
$$
DELIMITER ;
