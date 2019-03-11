DELIMITER $$
CREATE PROCEDURE CreateArtistPortfolio
(
	IN _userId INT,
    IN _profilePicture VARCHAR(2048),
    IN _biography VARCHAR(500),
    OUT _status SMALLINT
)
BEGIN
    DECLARE USER_ID_DOES_NOT_EXIST SMALLINT DEFAULT 1005;
    DECLARE ARTIST_PORTFOLIO_ALREADY_EXISTS SMALLINT DEFAULT 1071;

    CreateArtistPortfolio:BEGIN
        -- Check if the user exists
        IF (!DoesUserIdExist(_userId)) THEN
            SET _status = USER_ID_DOES_NOT_EXIST;
            LEAVE CreateArtistPortfolio;
        END IF;

        -- Check if the user already has an artist portfolio
        IF (DoesUserHaveArtistPortfolio(_userId)) THEN
            SET _status = ARTIST_PORTFOLIO_ALREADY_EXISTS;
            LEAVE CreateArtistPortfolio;
        END IF;

        -- Create the client profile
        INSERT INTO Artist_Portfolio(User_Id, Profile_Picture_Url, Biography) VALUES
        (_userId, _profilePicture, _biography);
        SET _status = 0;
    END;
END
$$
DELIMITER ;