DELIMITER $$
CREATE PROCEDURE GetSessionInfo
(
    IN _requesterSessionKey VARCHAR(256),
    IN _queriedSessionKey VARCHAR(256)
)
BEGIN
    DECLARE INVALID_REQUESTER_KEY SMALLINT DEFAULT 1021;
    DECLARE INVALID_QUERIED_KEY SMALLINT DEFAULT 1022;
    DECLARE SESSION_NOT_AUTHORIZED SMALLINT DEFAULT 1023;

    DECLARE result SMALLINT DEFAULT 0;
    DECLARE userId INT DEFAULT NULL;

    GetSessionInfo:BEGIN
		IF (IsSessionKeyValid(_requesterSessionKey) != 0) THEN
			SET result = INVALID_REQUESTER_KEY;
			LEAVE GetSessionInfo;
		END IF;

        IF (IsSessionKeyValid(_queriedSessionKey) != 0) THEN
			SET result = INVALID_QUERIED_KEY;
			LEAVE GetSessionInfo;
		END IF;

        IF (!IsSessionAuthorizedForSession(_requesterSessionKey, _queriedSessionKey)) THEN
            SET result = SESSION_NOT_AUTHORIZED;
			LEAVE GetSessionInfo;
        END IF;

        -- Get the user id of the queried session to return the info
        SELECT
            User_Id
        INTO
            userId
        FROM
            Session
        WHERE
            Session_Key = _queriedSessionKey;
    END;

	IF (userId IS NULL) THEN
		SELECT
			result AS Result,
            NULL AS Display_Name,
            NULL AS First_Name,
            NULL AS Last_Name,
            NULL AS Is_Artist;
    ELSE
		SELECT
			result as Result,
			Display_Name,
			First_Name,
			Last_Name,
            IsUserArtist(userId) AS Is_Artist
		FROM
			User
		WHERE
			User_Id = userId;
	END IF;
END
$$
DELIMITER ;