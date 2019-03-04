DELIMITER $$
CREATE PROCEDURE DeactivateUser
(
    IN _sessionKey VARCHAR(256),
    IN _userId INT,
    OUT _status SMALLINT
)
BEGIN
    DECLARE USER_ID_DOES_NOT_EXIST SMALLINT DEFAULT 1005;

    DeactivateUser:BEGIN
        -- Check if the User Id given exists
        IF (_userId IS NULL OR !DoesUserIdExist(_userId)) THEN
            SET _status = USER_ID_DOES_NOT_EXIST;
            LEAVE DeactivateUser;
        END IF;

        -- Update the user info
        UPDATE
            User
        SET
            Active = FALSE
        WHERE
            User_Id = _userId;

        CALL LogUserDeactivation(_sessionKey);
        
        SET _status = 0;
    END;
END
$$
DELIMITER ;