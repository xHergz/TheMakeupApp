DELIMITER $$
CREATE PROCEDURE DeleteArtistMakeoverOffered
(
    IN _artistMakeoverOfferedId INT,
    OUT _status SMALLINT
)
BEGIN
    DECLARE ARTIST_MAKEOVER_OFFERED_ID_DOES_NOT_EXIST SMALLINT DEFAULT 2010;

    DeleteArtistMakeoverOffered:BEGIN
        -- Check if the client headshot exists
        IF (!DoesArtistMakeoverOfferedIdExist(_artistMakeoverOfferedId)) THEN
            SET _status = ARTIST_MAKEOVER_OFFERED_ID_DOES_NOT_EXIST;
            LEAVE DeleteArtistMakeoverOffered;
        END IF;

        -- Delete All Serive Addons connected to services for the makeover
        DELETE
            addons
        FROM
            Artist_Service_Addon AS addons
            INNER JOIN Artist_Service ON Artist_Service.Artist_Service_Id = addons.Artist_Service_Id
        WHERE
            Artist_Service.Artist_Makeover_Offered_Id = _artistMakeoverOfferedId;

        -- Delete all service consultations connected to services for the makeover
        DELETE
            consultations
        FROM
            Artist_Service_Consultation AS consultations
            INNER JOIN Artist_Service ON Artist_Service.Artist_Service_Id = consultations.Artist_Service_Id
        WHERE
            Artist_Service.Artist_Makeover_Offered_Id = _artistMakeoverOfferedId;

        -- Delete all services connected to the makeover
        DELETE FROM
            Artist_Service
        WHERE
            Artist_Service.Artist_Makeover_Offered_Id = _artistMakeoverOfferedId;

        -- Delete the entry
        DELETE FROM
            Artist_Makeover_Offered
        WHERE
            Artist_Makeover_Offered_Id = _artistMakeoverOfferedId;
        
        SET _status = 0;
    END;
END
$$
DELIMITER ;