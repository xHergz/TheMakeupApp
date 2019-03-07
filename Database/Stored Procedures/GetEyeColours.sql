DELIMITER $$
CREATE PROCEDURE GetEyeColours
(
    OUT _status SMALLINT
)
BEGIN
    GetEyeColours:BEGIN
        SET _status = 0;
    END;

    SELECT
        Eye_Colour_Id,
        Description AS Eye_Colour_Description
    FROM
        Eye_Colour;
END
$$
DELIMITER ;