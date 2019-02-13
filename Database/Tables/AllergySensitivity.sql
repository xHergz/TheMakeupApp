CREATE TABLE Allergy_Sensitivity
(
    Allergy_Sensitivity_Id INT NOT NULL AUTO_INCREMENT,
    Description VARCHAR(100) NOT NULL,
    Client_Profile_Id INT,
    PRIMARY KEY(Allergy_Sensitivity_Id),
    FOREIGN KEY(Client_Profile_Id) REFERENCES Client_Profile(Client_Profile_Id)
);
