DELIMITER $$
CREATE PROCEDURE GetSkinTones
(
    OUT _status SMALLINT
)
BEGIN
    GetSkinTones:BEGIN
        SET _status = 0;
    END;

    SELECT
        Skin_Tone_Id,
        Description AS Skin_Tone_Description
    FROM
        Skin_Tone;
END
$$
DELIMITER ;