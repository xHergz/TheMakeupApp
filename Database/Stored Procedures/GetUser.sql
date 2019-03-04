DELIMITER $$
CREATE PROCEDURE GetUser
(
    IN _displayName VARCHAR(50),
    OUT _status SMALLINT
)
BEGIN
    DECLARE DISPLAY_NAME_DOES_NOT_EXIST SMALLINT DEFAULT 1004;

    GetUserNotifications:BEGIN
        -- Check if the display name exists
		IF (!DoesUserDisplayNameExist(_displayName)) THEN
			SET _status = DISPLAY_NAME_DOES_NOT_EXIST;
			LEAVE GetUserNotifications;
		END IF;

        SET _status = 0;
    END;

    SELECT
        User_Id,
        Email,
        Display_Name,
        First_Name,
        Last_Name
    FROM
        User
    WHERE
        Display_Name = _displayName;
    

END
$$
DELIMITER ;