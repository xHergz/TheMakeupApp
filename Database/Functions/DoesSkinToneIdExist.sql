DELIMITER $$
CREATE FUNCTION DoesSkinToneIdExist
(
	_skinToneId INT
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
                Skin_Tone_Id
            FROM
                Skin_Tone
            WHERE
                Skin_Tone_Id = _skinToneId
        )
    ) THEN 
        RETURN FALSE;
    END IF;

    RETURN TRUE;
END
$$
DELIMITER ;
