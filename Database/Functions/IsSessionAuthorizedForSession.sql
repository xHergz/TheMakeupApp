DELIMITER $$
CREATE FUNCTION IsSessionAuthorizedForSession
(
	_requesterSessionKey VARCHAR(256),
    _queriedSessionKey VARCHAR(256)
)
RETURNS BOOLEAN
DETERMINISTIC
BEGIN
    -- Right now we only want to allow the owner of the session to query about the session, but this could be
    -- expanded to allow some sort of admin query about the session later on.
    RETURN _requesterSessionKey = _queriedSessionKey;
END
$$
DELIMITER ;
