DELIMITER $$
CREATE PROCEDURE CreateUser
(
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
    
    DECLARE newUserId INT DEFAULT NULL;

    CreateUser:BEGIN
        -- Check if the email already exists
        IF (DoesUserEmailExist(_email)) THEN
            SET _status = EMAIL_NOT_AVAILABLE;
            LEAVE CreateUser;
        END IF;

        -- Check if the display name already exists
        IF (DoesUserDisplayNameExist(_displayName)) THEN
            SET _status = DISPLAY_NAME_NOT_AVAILABLE;
            LEAVE CreateUser;
        END IF;

        -- Create the user
        INSERT INTO User (Email, Password_Hash, Display_Name, First_Name, Last_Name) VALUES
        (_email, _passwordHash, _displayName, _firstName, _lastName);
        SET newUserId = LAST_INSERT_ID();
        SET _status = 0;
    END;

    SELECT
        newUserId AS New_User_Id;
END
$$
DELIMITER ;