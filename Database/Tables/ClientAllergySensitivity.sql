CREATE TABLE Client_Allergy_Sensitivity
(
    Client_Profile_Id INT NOT NULL,
    Allergy_Sensitivity_Id INT NOT NULL,
    PRIMARY KEY(Client_Profile_Id, Allergy_Sensitivity_Id),
    FOREIGN KEY(Client_Profile_Id) REFERENCES Client_Profile(Client_Profile_Id),
    FOREIGN KEY(Allergy_Sensitivity_Id) REFERENCES Allergy_Sensitivity(Allergy_Sensitivity_Id)
);
