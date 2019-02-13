CREATE TABLE Product_Preference
(
    Product_Preference_Id INT NOT NULL AUTO_INCREMENT,
    Description VARCHAR(100) NOT NULL,
    Client_Profile_Id INT,
    PRIMARY KEY(Product_Preference_Id),
    FOREIGN KEY(Client_Profile_Id) REFERENCES Client_Profile(Client_Profile_Id)
);
