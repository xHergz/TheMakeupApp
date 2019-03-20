DELIMITER $$
CREATE FUNCTION IsSessionAuthorizedForConsultation
(
	_sessionKey VARCHAR(256),
    _consultationId INT
)
RETURNS BOOLEAN
DETERMINISTIC
BEGIN
    DECLARE sessionClientProfileId INT DEFAULT NULL;
    DECLARE sessionArtistPortfolioId INT DEFAULT NULL;
    DECLARE consultationClientProfileId INT DEFAULT NULL;
    DECLARE consultationArtistPortfolioId INT DEFAULT NULL;

    SET sessionClientProfileId = GetClientProfileIdBySessionKey(_sessionKey);
    SET sessionArtistPortfolioId = GetArtistPortfolioIdBySessionKey(_sessionKey);

    SELECT
        Client_Profile_Id,
        Artist_Portfolio_Id
    INTO
        consultationClientProfileId,
        consultationArtistPortfolioId
    FROM
        Consultation
    WHERE
        Consultation_Id = _consultationId;

    IF (sessionClientProfileId = consultationClientProfileId OR sessionArtistPortfolioId = consultationArtistPortfolioId) THEN
        RETURN TRUE;
    END IF;

    RETURN FALSE;
END
$$
DELIMITER ;
