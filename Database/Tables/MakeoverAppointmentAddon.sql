CREATE TABLE Makeover_Appointment_Addon
(
    Makeover_Appointment_Addon_Id INT NOT NULL AUTO_INCREMENT,
    Makeover_Appointment_Id INT NOT NULL,
    Description VARCHAR(250) NOT NULL,
    Price DOUBLE(6, 2) NOT NULL,
    PRIMARY KEY(Makeover_Appointment_Addon_Id),
    FOREIGN KEY(Makeover_Appointment_Id) REFERENCES Makeover_Appointment(Makeover_Appointment_Id)
);
