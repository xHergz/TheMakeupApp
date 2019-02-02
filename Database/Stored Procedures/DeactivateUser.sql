DELIMITER $$
CREATE PROCEDURE DeactivateUser
(
    IN _sessionKey VARCHAR(256),
    IN _userId INT
)
BEGIN
    DECLARE result SMALLINT;

    -- Check if the session owns the user
    IF (!DoesSessionOwnUser(_sessionKey, _userId)) THEN
        SET result = 1011;
    ELSE
        -- Update the user info
        UPDATE
            User
        SET
            Active = FALSE
        WHERE
            User_Id = _userId;

        SET result = 0;
    END IF;

    SELECT
        result AS Result;
END
$$
DELIMITER ;