CREATE VIEW Full_User_Log
AS
SELECT
    User_Log.User_Log_Id,
    User_Log.Timestamp,
    Session.User_Id,
    User.Display_Name,
    User_Log.User_Action_Id,
    User_Action.Description,
    User_Log.Message,
    Session.Session_Key,
    Session.Ip_Address
FROM
    User_Log
    INNER JOIN Session ON Session.Session_Id = User_Log.Session_Id
    INNER JOIN User ON User.User_Id = Session.User_Id
    INNER JOIN User_Action ON User_Action.User_Action_Id = User_Log.User_Action_Id;