DELIMITER $$
CREATE PROCEDURE UpdateArtistPortfolio
(
    IN _artistPortfolioId INT,
    IN _profilePicture VARCHAR(2048),
    IN _biography VARCHAR(500),
    OUT _status SMALLINT
)
BEGIN
    DECLARE ARTIST_PORTFOLIO_ID_DOES_NOT_EXIST SMALLINT DEFAULT 1070;

    DECLARE currentProfilePicture VARCHAR(2048);
    DECLARE currentBiography VARCHAR(500);
    DECLARE updateProfilePicture BOOLEAN DEFAULT FALSE;
    DECLARE updateBiography BOOLEAN DEFAULT FALSE;

    UpdateArtistPortfolio:BEGIN
        -- Check if the artist portfolio id given exists
        IF (_artistPortfolioId IS NULL OR !DoesArtistPortfolioIdExist(_artistPortfolioId)) THEN
            SET _status = ARTIST_PORTFOLIO_ID_DOES_NOT_EXIST;
            LEAVE UpdateArtistPortfolio;
        END IF;

        -- Get the current values
        SELECT
            Profile_Picture_Url,
            Biography
        INTO
            currentProfilePicture,
            currentBiography
        FROM
            Artist_Portfolio
        WHERE
            Artist_Portfolio_Id = _artistPortfolioId;

        -- Check if each value has changed or is null to determine if it needs to be updated
        IF (currentProfilePicture != _profilePicture AND _profilePicture IS NOT NULL) THEN
            SET updateProfilePicture = TRUE;
        END IF;

        IF (currentBiography != _biography AND _biography IS NOT NULL) THEN
            SET updateBiography = TRUE;
        END IF;

        -- Update the user info
        UPDATE
            Artist_Portfolio
        SET
            Profile_Picture_Url = CASE WHEN updateProfilePicture = TRUE THEN _profilePicture ELSE currentProfilePicture END,
            Biography = CASE WHEN updateBiography = TRUE THEN _biography ELSE currentBiography END
        WHERE
            Artist_Portfolio_Id = _artistPortfolioId;

        SET _status = 0;
    END;
END
$$
DELIMITER ;