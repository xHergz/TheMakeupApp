CREATE TABLE Notification
(
    Notification_Id INT NOT NULL AUTO_INCREMENT,
    Notification_Type_Id INT NOT NULL,
    User_Id INT NOT NULL,
    Timestamp DATETIME NOT NULL,
    Message VARCHAR(1000) NOT NULL,
    Action_Url VARCHAR(2048) NOT NULL,
    Received BOOLEAN NOT NULL,
    PRIMARY KEY(Notification_Id),
    FOREIGN KEY(Notification_Type_Id) REFERENCES Notification_Type(Notification_Type_Id),
    FOREIGN KEY(User_Id) REFERENCES User(User_Id)
);
