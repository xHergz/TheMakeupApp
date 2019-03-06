DELIMITER $$
CREATE FUNCTION DoesHairColourIdExist
(
	_hairColourId INT
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
                Hair_Colour_Id
            FROM
                Hair_Colour
            WHERE
                Hair_Colour_Id = _hairColourId
        )
    ) THEN 
        RETURN FALSE;
    END IF;

    RETURN TRUE;
END
$$
DELIMITER ;
