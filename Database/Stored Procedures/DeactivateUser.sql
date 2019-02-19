DELIMITER $$
CREATE PROCEDURE DeactivateUser
(
    IN _sessionKey VARCHAR(256),
    IN _displayName VARCHAR(50),
    OUT _status SMALLINT
)
BEGIN
    DeactivateUser:BEGIN
        -- Update the user info
        UPDATE
            User
        SET
            Active = FALSE
        WHERE
            Display_Name = _displayName;

        CALL LogUserDeactivation(_sessionKey);
        
        SET _status = 0;
    END;
END
$$
DELIMITER ;