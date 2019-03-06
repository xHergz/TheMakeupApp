DELIMITER $$
CREATE FUNCTION DoesEyeColourIdExist
(
	_eyeColourId INT
)
RETURNS SMALLINT
READS SQL DATA
NOT DETERMINISTIC
BEGIN
    IF
    (
        NOT EXISTS
        (
            SELECT
                Eye_Colour_Id
            FROM
                Eye_Colour
            WHERE
                Eye_Colour_Id = _eyeColourId
        )
    ) THEN 
        RETURN FALSE;
    END IF;

    RETURN TRUE;
END
$$
DELIMITER ;
