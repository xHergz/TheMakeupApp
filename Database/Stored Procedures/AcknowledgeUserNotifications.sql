DELIMITER $$
CREATE PROCEDURE AcknowledgeUserNotifications
(
    IN _displayName VARCHAR(50),
    OUT _status SMALLINT
)
BEGIN
    DECLARE DISPLAY_NAME_DOES_NOT_EXIST SMALLINT DEFAULT 1004;

    DECLARE userId INT DEFAULT NULL;

    AcknowledgeUserNotifications:BEGIN
        -- Check if the display name exists
		IF (!DoesUserDisplayNameExist(_displayName)) THEN
			SET _status = DISPLAY_NAME_DOES_NOT_EXIST;
			LEAVE AcknowledgeUserNotifications;
		END IF;

        SET userId = GetUserIdByDisplayName(_displayName);

        UPDATE
            Notification
        SET
            Received = TRUE
        WHERE
            User_Id = userId AND Received = FALSE;

        SET _status = 0;
    END;
END
$$
DELIMITER ;