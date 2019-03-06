DELIMITER $$
CREATE PROCEDURE AddClientReview
(
    IN _clientProfileId INT,
    IN _artistPortfolioId INT,
    IN _rating TINYINT,
    IN _review VARCHAR(1000),
    OUT _status SMALLINT
)
BEGIN
    DECLARE CLIENT_PROFILE_DOES_NOT_EXIST SMALLINT DEFAULT 1035;
    DECLARE ARTIST_PORTFOLIO_DOES_NOT_EXIST SMALLINT DEFAULT 1042;

    AddClientReview:BEGIN
        -- Check if the client profile exists
		IF (!DoesClientProfileIdExist(_clientProfileId)) THEN
			SET _status = CLIENT_PROFILE_DOES_NOT_EXIST;
			LEAVE AddClientReview;
		END IF;

        -- Check if the artist portfolio exists
		IF (!DoesArtistPortfolioIdExist(_artistPortfolioId)) THEN
			SET _status = ARTIST_PORTFOLIO_DOES_NOT_EXIST;
			LEAVE AddClientReview;
		END IF;

        INSERT INTO Client_Review(Client_Profile_Id, Artist_Portfolio_Id, Rating, Review, Date_Posted) VALUES
        (_clientProfileId, _artistPortfolioId, _rating, _review, CURRENT_TIMESTAMP);
        SET _status = 0;
    END;
END
$$
DELIMITER ;