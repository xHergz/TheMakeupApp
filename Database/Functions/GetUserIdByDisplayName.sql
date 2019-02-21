DELIMITER $$
CREATE FUNCTION GetUserIdByDisplayName
(
	_displayName VARCHAR(50)
)
RETURNS INT
READS SQL DATA
NOT DETERMINISTIC
BEGIN
    DECLARE userId INT DEFAULT NULL;

    SELECT
        User_Id
    INTO
        userId
    FROM
        User
    WHERE
        Display_Name = _displayName;

    RETURN userId;
END
$$
DELIMITER ;
