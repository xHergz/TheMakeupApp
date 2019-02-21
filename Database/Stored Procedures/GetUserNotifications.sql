DELIMITER $$
CREATE PROCEDURE GetUserNotifications
(
    IN _displayName VARCHAR(50),
    IN _lastNotificationId INT,
    OUT _status SMALLINT
)
BEGIN
    DECLARE DISPLAY_NAME_DOES_NOT_EXIST SMALLINT DEFAULT 1004;

    DECLARE userId INT DEFAULT NULL;

    GetUserNotifications:BEGIN
        -- Check if the display name exists
		IF (!DoesUserDisplayNameExist(_displayName)) THEN
			SET _status = DISPLAY_NAME_DOES_NOT_EXIST;
			LEAVE GetUserNotifications;
		END IF;

        SET userId = GetUserIdByDisplayName(_displayName);

        SET _status = 0;
    END;

    (
        SELECT
            Notification_Id,
            Notification_Type_Id,
            Timestamp,
            Message,
            Action_Url,
            Received
        FROM
            Notification
        WHERE
            User_Id = userId
            AND Received = FALSE
            AND (Notification_Id < _lastNotificationId OR _lastNotificationId IS NULL)
        ORDER BY
            Notification_Id DESC
    )
    UNION ALL
    (
        SELECT
            Notification_Id,
            Notification_Type_Id,
            Timestamp,
            Message,
            Action_Url,
            Received
        FROM
            Notification
        WHERE
            User_Id = userId
            AND Received = TRUE
            AND (Notification_Id < _lastNotificationId OR _lastNotificationId IS NULL)
        ORDER BY
            Notification_Id DESC
        LIMIT 10
    )
    ORDER BY
            Timestamp DESC;
    

END
$$
DELIMITER ;