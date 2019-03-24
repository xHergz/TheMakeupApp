DELIMITER $$
CREATE PROCEDURE CreateConsultation
(
	IN _clientProfileId INT,
    IN _artistPortfolioId INT,
    OUT _status SMALLINT
)
BEGIN
    DECLARE CLIENT_PROFILE_ID_DOES_NOT_EXIST SMALLINT DEFAULT 1035;
    DECLARE ARTIST_PORTFOLIO_ID_DOES_NOT_EXIST SMALLINT DEFAULT 1070;

    DECLARE newConsultationId INT DEFAULT NULL;
    DECLARE newRoomId VARCHAR(256) DEFAULT NULL;
    DECLARE artistDisplayName VARCHAR(100) DEFAULT NULL;
    DECLARE clientDisplayName VARCHAR(100) DEFAULT NULL;

    CreateConsultation:BEGIN
        IF (!DoesClientProfileIdExist(_clientProfileId)) THEN
            SET _status = CLIENT_PROFILE_ID_DOES_NOT_EXIST;
            LEAVE CreateConsultation;
        END IF;

        IF (!DoesArtistPortfolioIdExist(_artistPortfolioId)) THEN
            SET _status = ARTIST_PORTFOLIO_ID_DOES_NOT_EXIST;
            LEAVE CreateConsultation;
        END IF;

        SET newRoomId = UUID();

        INSERT INTO
            Consultation (
                Room_Id,
                Client_Profile_Id,
                Artist_Portfolio_Id,
                Date_Created
            )
        VALUES
            (
                newRoomId,
                _clientProfileId,
                _artistPortfolioId,
                CURRENT_TIMESTAMP
            );
        SET newConsultationId = LAST_INSERT_ID();

        SELECT
            User.Display_Name
        INTO
            artistDisplayName
        FROM
            Artist_Portfolio
            INNER JOIN User ON User.User_Id = Artist_Portfolio.User_Id
        WHERE
            Artist_Portfolio.Artist_Portfolio_Id = _artistPortfolioId;

        SELECT
            User.Display_Name
        INTO
            clientDisplayName
        FROM
            Client_Profile
            INNER JOIN User ON User.User_Id = Client_Profile.User_Id
        WHERE
            Client_Profile.Client_Profile_Id = _clientProfileId;

        CALL AddTaskUserNotification(artistDisplayName, CONCAT('You have setup a consultation with ', clientDisplayName, ', click here to join.'), CONCAT('/consultation/', newConsultationId), @status);
        CALL AddTaskUserNotification(clientDisplayName, CONCAT(artistDisplayName, ' has setup a consultation with you, click here to join.'), CONCAT('/consultation/', newConsultationId), @status);
        SET _status = 0;
    END;

    SELECT
        newConsultationId AS New_Consultation_Id;
END
$$
DELIMITER ;