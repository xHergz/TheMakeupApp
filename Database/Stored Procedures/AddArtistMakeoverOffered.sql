DELIMITER $$
CREATE PROCEDURE AddArtistMakeoverOffered
(
    IN _artistPortfolioId INT,
    IN _makeoverTypeId INT,
    OUT _status SMALLINT
)
BEGIN
    DECLARE ARTIST_PORTFOLIO_DOES_NOT_EXIST SMALLINT DEFAULT 1070;
    DECLARE MAKEOVER_TYPE_ID_DOES_NOT_EXIST SMALLINT DEFAULT 1080;
    DECLARE ARTIST_MAKEOVER_OFFERED_ALREADY_EXISTS SMALLINT DEFAULT 2011;

    AddArtistMakeoverOffered:BEGIN
        -- Check if the artist portfolio exists
		IF (!DoesArtistPortfolioIdExist(_artistPortfolioId)) THEN
			SET _status = ARTIST_PORTFOLIO_DOES_NOT_EXIST;
			LEAVE AddArtistMakeoverOffered;
		END IF;

        IF (!DoesMakeoverTypeIdExist(_makeoverTypeId)) THEN
			SET _status = MAKEOVER_TYPE_ID_DOES_NOT_EXIST;
			LEAVE AddArtistMakeoverOffered;
		END IF;

        IF (DoesArtistOfferMakeover(_artistPortfolioId, _makeoverTypeId)) THEN
			SET _status = ARTIST_MAKEOVER_OFFERED_ALREADY_EXISTS;
			LEAVE AddArtistMakeoverOffered;
		END IF;

        INSERT INTO Artist_Makeover_Offered(Artist_Portfolio_Id, Makeover_Type_Id) VALUES
        (_artistPortfolioId, _makeoverTypeId);
        SET _status = 0;
    END;
END
$$
DELIMITER ;