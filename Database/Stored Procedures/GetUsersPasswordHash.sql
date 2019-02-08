DELIMITER $$
CREATE PROCEDURE GetUsersPasswordHash
(
	IN _email VARCHAR(256)
)
BEGIN
    DECLARE result SMALLINT;
    DECLARE userId INT;
    DECLARE passwordHash VARCHAR(256);

    -- Check if the email already exists
    IF (IsUserEmailAvailable(_email)) THEN
        SET result = 1003;
        SET passwordHash = NULL;
        SET userId = NULL;
    ELSE
        SET result = 0;
        SELECT
            User_Id,
            Password_Hash
        INTO
            userId,
            passwordHash
        FROM
            User
        WHERE
            Email = _email;
    END IF;

    SELECT
        result AS Result,
        userId AS User_Id,
        passwordHash AS Password_Hash;
END
$$
DELIMITER ;