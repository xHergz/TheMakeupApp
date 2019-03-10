DELIMITER $$
CREATE PROCEDURE CreateArtistApplication
(
	IN _clientProfileId INT,
    IN _resumePath VARCHAR(2048),
    IN _coverLetterPath VARCHAR(2048),
    OUT _status SMALLINT
)
BEGIN
    DECLARE CLIENT_PROFILE_ID_DOES_NOT_EXIST SMALLINT DEFAULT 1035;

    DECLARE newApplicationId INT DEFAULT NULL;

    CreateArtistApplication:BEGIN
        IF (!DoesClientProfileIdExist(_clientProfileId)) THEN
            SET _status = CLIENT_PROFILE_ID_DOES_NOT_EXIST;
            LEAVE CreateArtistApplication;
        END IF;
        
        INSERT INTO Artist_Application(Application_Date, Client_Profile_Id, Resume_Path, Cover_Letter_Path) VALUES
        (CURRENT_TIMESTAMP, _clientProfileId, _resumePath, _coverLetterPath);
        SET newApplicationId = LAST_INSERT_ID();
        SET _status = 0;
    END;

    SELECT
        newApplicationId AS New_Application_Id;
END
$$
DELIMITER ;