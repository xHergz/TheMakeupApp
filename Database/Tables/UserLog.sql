CREATE TABLE User_Log
(
    User_Log_Id INT NOT NULL AUTO_INCREMENT,
    Session_Id INT NOT NULL,
    User_Action_Id SMALLINT NOT NULL,
    Timestamp DATETIME NOT NULL,
    Message VARCHAR(500) NOT NULL,
    PRIMARY KEY(User_Log_Id),
    FOREIGN KEY(Session_Id) REFERENCES Session(Session_Id),
    FOREIGN KEY(User_Action_Id) REFERENCES User_Action(User_Action_Id)
);
