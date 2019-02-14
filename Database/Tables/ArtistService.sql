CREATE TABLE Artist_Service
(
    Artist_Service_Id INT NOT NULL AUTO_INCREMENT,
    Artist_Makeover_Offered_Id INT NOT NULL,
    Service_Type_Id INT NOT NULL,
    Base_Price DOUBLE(6, 2) NOT NULL,
    PRIMARY KEY(Artist_Service_Id),
    FOREIGN KEY(Artist_Makeover_Offered_Id) REFERENCES Artist_Makeover_Offered(Artist_Makeover_Offered_Id),
    FOREIGN KEY(Service_Type_Id) REFERENCES Service_Type(Service_Type_Id)
);
