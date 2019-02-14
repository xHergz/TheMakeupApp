CREATE TABLE Artist_Service_Consultation
(
    Artist_Service_Consultation_Id INT NOT NULL AUTO_INCREMENT,
    Artist_Service_Id INT NOT NULL,
    Consultation_Type_Id INT NOT NULL,
    Price DOUBLE(6, 2) NOT NULL,
    PRIMARY KEY(Artist_Service_Consultation_Id),
    FOREIGN KEY(Artist_Service_Id) REFERENCES Artist_Service(Artist_Service_Id),
    FOREIGN KEY(Consultation_Type_Id) REFERENCES Consultation_Type(Consultation_Type_Id)
);
