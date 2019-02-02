CREATE TABLE Session_Log
(
    Session_Log_Id INT NOT NULL AUTO_INCREMENT,
    Session_Id INT NOT NULL,
    Session_Action_Id SMALLINT NOT NULL,
    Timestamp DATETIME NOT NULL,
    PRIMARY KEY(Session_Log_Id),
    FOREIGN KEY(Session_Id) REFERENCES Session(Session_Id),
    FOREIGN KEY(Session_Action_Id) REFERENCES Session_Action(Session_Action_Id)
);
