DELIMITER $$
CREATE PROCEDURE GetClientReviews
(
    IN _displayName VARCHAR(50),
    OUT _status SMALLINT
)
BEGIN
    DECLARE DISPLAY_NAME_DOES_NOT_EXIST SMALLINT DEFAULT 1004;

    DECLARE clientProfileId INT;

    GetClientReviews:BEGIN
        -- Check if the display name exists
		IF (!DoesUserDisplayNameExist(_displayName)) THEN
			SET _status = DISPLAY_NAME_DOES_NOT_EXIST;
			LEAVE GetClientReviews;
		END IF;

        SET clientProfileId = GetClientProfileIdByDisplayName(_displayName);
        SET _status = 0;
    END;

    SELECT
        Client_Review.Client_Review_Id,
        Client_Review.Client_Profile_Id,
        Client_Review.Artist_Portfolio_Id,
        User.Display_Name,
        Client_Review.Rating,
        Client_Review.Review,
        Client_Review.Date_Posted,
        Client_Review.Makeover_Appointment_Id
    FROM
        Client_Review
        INNER JOIN Artist_Portfolio ON Artist_Portfolio.Artist_Portfolio_Id = Client_Review.Artist_Portfolio_Id
        INNER JOIN User ON User.User_Id = Artist_Portfolio.User_Id
    WHERE
        Client_Review.Client_Profile_Id = clientProfileId;
    

END
$$
DELIMITER ;