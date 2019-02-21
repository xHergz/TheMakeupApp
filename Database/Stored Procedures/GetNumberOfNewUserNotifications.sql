DELIMITER $$
CREATE PROCEDURE GetNumberOfNewUserNotifications
(
    IN _displayName VARCHAR(50),
    OUT _status SMALLINT
)
BEGIN
    DECLARE DISPLAY_NAME_DOES_NOT_EXIST SMALLINT DEFAULT 1004;

    DECLARE userId INT DEFAULT NULL;

    GetNumberOfNewUserNotifications:BEGIN
        -- Check if the display name exists
		IF (!DoesUserDisplayNameExist(_displayName)) THEN
			SET _status = DISPLAY_NAME_DOES_NOT_EXIST;
			LEAVE GetNumberOfNewUserNotifications;
		END IF;

        SET userId = GetUserIdByDisplayName(_displayName);
        SET _status = 0;
    END;

    SELECT
        COUNT(*) AS New_Notifications
    FROM
        Notification
    WHERE
        User_Id = userId
        AND Received = FALSE;
END
$$
DELIMITER ;