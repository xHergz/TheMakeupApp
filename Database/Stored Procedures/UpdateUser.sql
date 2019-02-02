DELIMITER $$
CREATE PROCEDURE UpdateUser
(
    IN _sessionKey VARCHAR(256),
    IN _userId INT,
	IN _email VARCHAR(256),
    IN _passwordHash VARCHAR(256),
    IN _displayName VARCHAR(50),
    IN _firstName VARCHAR(100),
    IN _lastName VARCHAR(100)
)
BEGIN
    DECLARE result SMALLINT;
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

    -- Check if the session owns the user
    IF (!DoesSessionOwnUser(_sessionKey, _userId)) THEN
        SET result = 1011;
    -- Check if the email is given and not available
    ELSEIF (_email IS NOT NULL AND !IsUserEmailAvailable(_email)) THEN
        SET result = 1001;
    -- Check if the display name is given and not available
    ELSEIF (_displayName IS NOT NULL AND !IsUserDisplayNameAvailable(_displayName)) THEN
        SET result = 1002;
    ELSE
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
        END IF;

        IF (_passwordHash IS NOT NULL) THEN
            SET updatePassword = TRUE;
        END IF;

        IF (currentDisplayName != _displayName AND _displayName IS NOT NULL) THEN
            SET updateDisplayName = TRUE;
        END IF;

        IF (currentFirstName != _firstName AND _firstName IS NOT NULL) THEN
            SET updateFirstName = TRUE;
        END IF;

        IF (currentLastName != _lastName AND _lastName IS NOT NULL) THEN
            SET updateLastName = TRUE;
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

        SET result = 0;
    END IF;

    SELECT
        result AS Result;
END
$$
DELIMITER ;