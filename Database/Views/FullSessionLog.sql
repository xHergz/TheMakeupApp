CREATE VIEW Full_Session_Log
AS
SELECT
    Session_Log.Session_Log_Id,
    Session_Log.Timestamp,
    Session_Log.Session_Id,
    Session.User_Id,
    User.Display_Name,
    Session_Log.Session_Action_Id,
    Session_Action.Description,
    Session.Session_Key,
    Session.Ip_Address
FROM
    Session_Log
    INNER JOIN Session ON Session.Session_Id = Session_Log.Session_Id
    INNER JOIN User ON User.User_Id = Session.User_Id
    INNER JOIN Session_Action ON Session_Action.Session_Action_Id = Session_Log.Session_Action_Id;