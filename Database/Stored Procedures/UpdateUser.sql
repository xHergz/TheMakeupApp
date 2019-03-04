DELIMITER $$
CREATE PROCEDURE UpdateUser
(
    IN _sessionKey VARCHAR(256),
    IN _userId INT,
	IN _email VARCHAR(256),
    IN _passwordHash VARCHAR(256),
    IN _displayName VARCHAR(50),
    IN _firstName VARCHAR(100),
    IN _lastName VARCHAR(100),
    OUT _status SMALLINT
)
BEGIN
    DECLARE EMAIL_NOT_AVAILABLE SMALLINT DEFAULT 1001;
    DECLARE DISPLAY_NAME_NOT_AVAILABLE SMALLINT DEFAULT 1002;
    DECLARE USER_ID_DOES_NOT_EXIST SMALLINT DEFAULT 1005;

    DECLARE currentEmail VARCHAR(256);
    DECLARE currentPassword VARCHAR(256);
    DECLARE currentDisplayName VARCHAR(50);
    DECLARE currentFirstName VARCHAR(100);
    DECLARE currentLastName VARCHAR(100);
    DECLARE updateEmail BOOLEAN DEFAULT FALSE;
    DECLARE updatePassword BOOLEAN DEFAULT FALSE;
    DECLARE updateDisplayName BOOLEAN DEFAULT FALSE;
    DECLARE updateFirstName BOOLEAN DEFAULT FALSE;
    DECLARE updateLastName BOOLEAN DEFAULT FALSE;

    UpdateUser:BEGIN
        -- Check if the User Id given exists
        IF (_userId IS NULL OR !DoesUserIdExist(_userId)) THEN
            SET _status = USER_ID_DOES_NOT_EXIST;
            LEAVE UpdateUser;
        END IF;

        -- Check if the email is given and not available
        IF (_email IS NOT NULL AND DoesUserEmailExist(_email)) THEN
            SET _status = EMAIL_NOT_AVAILABLE;
            LEAVE UpdateUser;
        END IF;

        -- Check if the display name is given and not available
        IF (_displayName IS NOT NULL AND DoesUserDisplayNameExist(_displayName)) THEN
            SET _status = DISPLAY_NAME_NOT_AVAILABLE;
            LEAVE UpdateUser;
        END IF;

        -- Get the current values
        SELECT
            Email,
            Password_Hash,
            Display_Name,
            First_Name,
            Last_Name
        INTO
            currentEmail,
            currentPassword,
            currentDisplayName,
            currentFirstName,
            currentLastName
        FROM
            User
        WHERE
            User_Id = _userId;

        -- Check if each value has changed or is null to determine if it needs to be updates
        IF (currentEmail != _email AND _email IS NOT NULL) THEN
            SET updateEmail = TRUE;
            CALL LogUserUpdate(_sessionKey, 'Email', currentEmail, _email);
        END IF;

        IF (_passwordHash IS NOT NULL) THEN
            SET updatePassword = TRUE;
            CALL LogUserUpdate(_sessionKey, 'Password_Hash', '(Redacted)', '(Redacted)');
        END IF;

        IF (currentDisplayName != _displayName AND _displayName IS NOT NULL) THEN
            SET updateDisplayName = TRUE;
            CALL LogUserUpdate(_sessionKey, 'Display_Name', currentDisplayName, _displayName);
        END IF;

        IF (currentFirstName != _firstName AND _firstName IS NOT NULL) THEN
            SET updateFirstName = TRUE;
            CALL LogUserUpdate(_sessionKey, 'First_Name', currentFirstName, _firstName);
        END IF;

        IF (currentLastName != _lastName AND _lastName IS NOT NULL) THEN
            SET updateLastName = TRUE;
            CALL LogUserUpdate(_sessionKey, 'Last_Name', currentLastName, _lastName);
        END IF;

        -- Update the user info
        UPDATE
            User
        SET
            Email = CASE WHEN updateEmail = TRUE THEN _email ELSE currentEmail END,
            Password_Hash = CASE WHEN updatePassword = TRUE THEN _passwordHash ELSE currentPassword END,
            Display_Name = CASE WHEN updateDisplayName = TRUE THEN _displayName ELSE currentDisplayName END,
            First_Name = CASE WHEN updateFirstName = TRUE THEN _firstName ELSE currentFirstName END,
            Last_Name = CASE WHEN updateLastName = TRUE THEN _lastName ELSE currentLastName END
        WHERE
            User_Id = _userId;

        SET _status = 0;
    END;
END
$$
DELIMITER ;