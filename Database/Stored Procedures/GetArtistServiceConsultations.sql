DELIMITER $$
CREATE PROCEDURE GetArtistServiceConsultations
(
    IN _displayName VARCHAR(50),
    OUT _status SMALLINT
)
BEGIN
    DECLARE DISPLAY_NAME_DOES_NOT_EXIST SMALLINT DEFAULT 1004;

    DECLARE artistPortfolioId INT;

    GetArtistServiceConsultations:BEGIN
        -- Check if the display name exists
		IF (!DoesUserDisplayNameExist(_displayName)) THEN
			SET _status = DISPLAY_NAME_DOES_NOT_EXIST;
			LEAVE GetArtistServiceConsultations;
		END IF;

        SET artistPortfolioId = GetArtistPortfolioIdByDisplayName(_displayName);
        SET _status = 0;
    END;

    SELECT
        Artist_Service_Consultation.Artist_Service_Consultation_Id,
        Artist_Service.Artist_Service_Id,
        Artist_Service_Consultation.Consultation_Type_Id,
        Consultation_Type.Minute_Length,
        Artist_Service_Consultation.Price
    FROM
        Artist_Service_Consultation
        INNER JOIN Consultation_Type ON Consultation_Type.Consultation_Type_Id = Artist_Service_Consultation.Consultation_Type_Id
        INNER JOIN Artist_Service ON Artist_Service.Artist_Service_Id = Artist_Service_Consultation.Artist_Service_Id
        INNER JOIN Artist_Makeover_Offered ON Artist_Makeover_Offered.Artist_Makeover_Offered_Id = Artist_Service.Artist_Makeover_Offered_Id
    WHERE
        Artist_Makeover_Offered.Artist_Portfolio_Id = artistPortfolioId;

END
$$
DELIMITER ;