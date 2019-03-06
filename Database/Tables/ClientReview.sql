CREATE TABLE Client_Review
(
    Client_Review_Id INT NOT NULL AUTO_INCREMENT,
    Client_Profile_Id INT NOT NULL,
    Artist_Portfolio_Id INT NOT NULL,
    Makeover_Appointment_Id INT,
    Rating TINYINT NOT NULL,
    Review VARCHAR(1000) NOT NULL,
    Date_Posted DATETIME NOT NULL,
    PRIMARY KEY(Client_Review_Id),
    FOREIGN KEY(Client_Profile_Id) REFERENCES Client_Profile(Client_Profile_Id),
    FOREIGN KEY(Artist_Portfolio_Id) REFERENCES Artist_Portfolio(Artist_Portfolio_Id),
    FOREIGN KEY(Makeover_Appointment_Id) REFERENCES Makeover_Appointment(Makeover_Appointment_Id)
);
