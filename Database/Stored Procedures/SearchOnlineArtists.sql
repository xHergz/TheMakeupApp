DELIMITER $$
CREATE PROCEDURE SearchOnlineArtists
(
	IN _makeoverTypeId INT,
    IN _serviceTypeId INT,
    IN _userLongitude DOUBLE,
    IN _userLatitude DOUBLE,
    IN _maxDistance INT,
    OUT _status SMALLINT
)
BEGIN
    DECLARE MAKEOVER_TYPE_ID_DOES_NOT_EXIST SMALLINT DEFAULT 1080;
    DECLARE SERVICE_TYPE_ID_DOES_NOT_EXIST SMALLINT DEFAULT 2020;

    SearchOnlineArtists:BEGIN
        IF (!DoesMakeoverTypeIdExist(_makeoverTypeId)) THEN
            SET _status = MAKEOVER_TYPE_ID_DOES_NOT_EXIST;
            LEAVE SearchOnlineArtists;
        END IF;

        IF (!DoesServiceTypeIdExist(_serviceTypeId)) THEN
            SET _status = SERVICE_TYPE_ID_DOES_NOT_EXIST;
            LEAVE SearchOnlineArtists;
        END IF;

        SET _status = 0;
    END;

    SELECT
        Artist_Portfolio.Artist_Portfolio_Id,
        Artist_Portfolio.Profile_Picture_Url,
        User.Display_Name,
        Online_Artist.Longitude,
        Online_Artist.Latitude,
        DistanceBetweenCoordinates(_userLongitude, _userLatitude, Online_Artist.Longitude, Online_Artist.Latitude) AS Distance,
        ROUND(RAND()*5) AS Rating,
        Artist_Service.Artist_Service_Id,
        Artist_Service.Base_Price
    FROM
        Artist_Portfolio
        INNER JOIN User ON User.User_Id = Artist_Portfolio.User_Id
        INNER JOIN Online_Artist ON Online_Artist.Artist_Portfolio_Id = Artist_Portfolio.Artist_Portfolio_Id
        INNER JOIN Artist_Makeover_Offered ON Artist_Makeover_Offered.Makeover_Type_Id = _makeoverTypeId
        INNER JOIN Artist_Service ON Artist_Service.Artist_Makeover_Offered_Id = Artist_Makeover_Offered.Artist_Makeover_Offered_Id
            AND Artist_Service.Service_Type_Id = _serviceTypeId
    HAVING
        Distance <= _maxDistance;
END
$$
DELIMITER ;