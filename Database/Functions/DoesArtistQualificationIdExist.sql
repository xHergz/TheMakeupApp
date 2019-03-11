DELIMITER $$
CREATE FUNCTION DoesArtistQualificationIdExist
(
	_artistQualificationId INT
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
                Artist_Qualification.Artist_Qualification_Id
            FROM
                Artist_Qualification
            WHERE
                Artist_Qualification.Artist_Qualification_Id = _artistQualificationId
        )
    ) THEN 
        RETURN FALSE;
    END IF;

    RETURN TRUE;
END
$$
DELIMITER ;
