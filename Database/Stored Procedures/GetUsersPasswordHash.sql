DELIMITER $$
CREATE PROCEDURE GetUsersPasswordHash
(
	IN _email VARCHAR(256),
    OUT _status SMALLINT
)
BEGIN
    DECLARE EMAIL_DOES_NOT_EXIST SMALLINT DEFAULT 1003;

    DECLARE userId INT DEFAULT NULL;
    DECLARE passwordHash VARCHAR(256) DEFAULT NULL;

    GetUsersPasswordHash:BEGIN
        -- Check if the email exists
        IF (!DoesUserEmailExist(_email)) THEN
            SET _status = EMAIL_DOES_NOT_EXIST;
            LEAVE GetUsersPasswordHash;
        END IF;

        SET _status = 0;
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
    END;

    SELECT
        userId AS User_Id,
        passwordHash AS Password_Hash;
END
$$
DELIMITER ;