DELIMITER $$
CREATE PROCEDURE GetHairColours
(
    OUT _status SMALLINT
)
BEGIN
    GetHairColours:BEGIN
        SET _status = 0;
    END;

    SELECT
        Hair_Colour_Id,
        Description
    FROM
        Hair_Colour;
END
$$
DELIMITER ;