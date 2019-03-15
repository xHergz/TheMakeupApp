CREATE TABLE Makeover_Appointment
(
    Makeover_Appointment_Id INT NOT NULL AUTO_INCREMENT,
    Client_Profile_Id INT NOT NULL,
    Artist_Portfolio_Id INT NOT NULL,
    Consultation_Type_Id INT NOT NULL,
    Consultation_Price DOUBLE(6, 2) NOT NULL,
    Service_Type_Id INT NOT NULL,
    Service_Price DOUBLE(6, 2) NOT NULL,
    Makeover_Type_Id INT NOT NULL,
    Appointment_Date DATETIME NOT NULL,
    Date_Scheduled DATETIME NOT NULL,
    PRIMARY KEY(Makeover_Appointment_Id),
    FOREIGN KEY(Client_Profile_Id) REFERENCES Client_Profile(Client_Profile_Id),
    FOREIGN KEY(Artist_Portfolio_Id) REFERENCES Artist_Portfolio(Artist_Portfolio_Id),
    FOREIGN KEY(Consultation_Type_Id) REFERENCES Consultation_Type(Consultation_Type_Id),
    FOREIGN KEY(Service_Type_Id) REFERENCES Service_Type(Service_Type_Id),
    FOREIGN KEY(Makeover_Type_Id) REFERENCES Makeover_Type(Makeover_Type_Id)
);
