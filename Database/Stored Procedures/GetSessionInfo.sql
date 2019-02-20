DELIMITER $$
CREATE PROCEDURE GetSessionInfo
(
    IN _sessionKey VARCHAR(256),
    OUT _status SMALLINT
)
BEGIN
    DECLARE INVALID_SESSION_KEY SMALLINT DEFAULT 1021;

    DECLARE userId INT DEFAULT NULL;

    GetSessionInfo:BEGIN
		IF (IsSessionKeyValid(_sessionKey) != 0) THEN
			SET _status = INVALID_SESSION_KEY;
			LEAVE GetSessionInfo;
		END IF;

        -- Get the user id of the queried session to return the info
        SET userId = GetUserIdBySessionKey(_sessionKey);

        SET _status = 0;
    END;

    SELECT
        Display_Name,
        First_Name,
        Last_Name,
        IsUserArtist(userId) AS Is_Artist
    FROM
        User
    WHERE
        User_Id = userId;
END
$$
DELIMITER ;