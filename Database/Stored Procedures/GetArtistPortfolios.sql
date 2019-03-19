DELIMITER $$
CREATE PROCEDURE GetArtistPortfolios
(
    OUT _status SMALLINT
)
BEGIN
    GetArtistPortfolios:BEGIN
        SET _status = 0;
    END;

    SELECT
        Artist_Portfolio.Artist_Portfolio_Id,
        User.Display_Name,
        Artist_Portfolio.Profile_Picture_Url,
        Artist_Portfolio.Biography,
        ROUND(RAND()*5) AS Rating
    FROM
        Artist_Portfolio
        INNER JOIN User ON User.User_Id = Artist_Portfolio.User_Id;  

END
$$
DELIMITER ;