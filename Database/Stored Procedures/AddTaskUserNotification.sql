DELIMITER $$
CREATE PROCEDURE AddTaskUserNotification
(
    IN _displayName VARCHAR(50),
    IN _message VARCHAR(1000),
    IN _actionUrl VARCHAR(1000),
    OUT _status SMALLINT
)
BEGIN
    DECLARE DISPLAY_NAME_DOES_NOT_EXIST SMALLINT DEFAULT 1004;
    DECLARE TASK_NOTIFICATION_TYPE SMALLINT DEFAULT 2;

    DECLARE userId INT DEFAULT NULL;

    AddTaskUserNotification:BEGIN
        -- Check if the display name exists
		IF (!DoesUserDisplayNameExist(_displayName)) THEN
			SET _status = DISPLAY_NAME_DOES_NOT_EXIST;
			LEAVE AddTaskUserNotification;
		END IF;

        SET userId = GetUserIdByDisplayName(_displayName);

        INSERT INTO Notification(Notification_Type_Id, User_Id, Timestamp, Message, Action_Url, Received) VALUES
        (TASK_NOTIFICATION_TYPE, userId, CURRENT_TIMESTAMP, _message, _actionUrl, FALSE);

        SET _status = 0;
    END;

END
$$
DELIMITER ;