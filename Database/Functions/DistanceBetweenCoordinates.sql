DELIMITER $$
CREATE FUNCTION DistanceBetweenCoordinates
(
	_coordOneLongitude DOUBLE,
    _coordOneLatitude DOUBLE,
    _coordTwoLongitude DOUBLE,
    _coordTwoLatitude DOUBLE
)
RETURNS DOUBLE
READS SQL DATA
NOT DETERMINISTIC
BEGIN
    -- The mean radius of the earth in meters
    DECLARE EARTHS_RADIUS INT DEFAULT 6371;

    -- Source: https://stackoverflow.com/a/574736/8070411
    RETURN EARTHS_RADIUS * acos( cos( radians(_coordOneLatitude) ) * cos( radians( _coordTwoLatitude ) ) 
		* cos( radians( _coordTwoLongitude ) - radians(_coordOneLongitude) ) + sin( radians(_coordOneLatitude) ) * sin(radians(_coordTwoLatitude)) );
END
$$
DELIMITER ;
