DELIMITER $$
CREATE FUNCTION DoesSessionOwnArtistServiceConsultation
(
	_sessionKey VARCHAR(256),
    _artistServiceConsultationId INT
)
RETURNS SMALLINT
READS SQL DATA
NOT DETERMINISTIC
BEGIN
    DECLARE artistPortfolioLinkedToServiceConsultation INT;

    SELECT
        Artist_Portfolio_Id
    INTO
        artistPortfolioLinkedToServiceConsultation
    FROM
        Artist_Service_Consultation
        INNER JOIN Artist_Service ON Artist_Service.Artist_Service_Id = Artist_Service_Consultation.Artist_Service_Id
        INNER JOIN Artist_Makeover_Offered ON Artist_Makeover_Offered.Artist_Makeover_Offered_Id = Artist_Service.Artist_Makeover_Offered_Id
    WHERE
        Artist_Service_Consultation_Id = _artistServiceConsultationId

    RETURN DoesSessionOwnArtistPortfolio(_sessionKey, artistPortfolioLinkedToServiceConsultation);
END
$$
DELIMITER ;
