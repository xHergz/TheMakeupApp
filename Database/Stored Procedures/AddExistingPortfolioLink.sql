DELIMITER $$
CREATE PROCEDURE AddExistingPortfolioLink
(
	IN _artistApplicationId INT,
    IN _link VARCHAR(2048),
    OUT _status SMALLINT
)
BEGIN
    DECLARE ARTIST_APPLICATION_DOES_NOT_EXIST SMALLINT DEFAULT 1060;

    AddExistingPortfolioLink:BEGIN
        IF (!DoesArtistApplicationIdExist(_artistApplicationId)) THEN
            SET _status = ARTIST_APPLICATION_DOES_NOT_EXIST;
            LEAVE AddExistingPortfolioLink;
        END IF;
        
        INSERT INTO Existing_Portfolio_Link(Artist_Application_Id, Link) VALUES
        (_artistApplicationId, _link);
        SET _status = 0;
    END;
END
$$
DELIMITER ;