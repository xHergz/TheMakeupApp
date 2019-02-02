DELIMITER $$
CREATE PROCEDURE CreateUser
(
	IN _email VARCHAR(256),
    IN _passwordHash VARCHAR(256),
    IN _displayName VARCHAR(50),
    IN _firstName VARCHAR(100),
    IN _lastName VARCHAR(100)
)
BEGIN
    DECLARE result SMALLINT;
    DECLARE newUserId INT;

    -- Check if the email already exists
    IF (!IsUserEmailAvailable(_email)) THEN
        SET result = 1001;
    -- Check if the display name already exists
    ELSEIF (!IsUserDisplayNameAvailable(_displayName)) THEN
        SET result = 1002;
    ELSE
        INSERT INTO User (Email, Password_Hash, Display_Name, First_Name, Last_Name) VALUES
        (_email, _passwordHash, _displayName, _firstName, _lastName);
        SET newUserId = LAST_INSERT_ID();
        SET result = 0;
    END IF;

    SELECT
        result AS Result,
        newUserId AS New_User_Id;
END
$$
DELIMITER ;