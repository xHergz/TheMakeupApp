CREATE TABLE Client_Product_Preference
(
    Client_Profile_Id INT NOT NULL,
    Product_Preference_Id INT NOT NULL,
    PRIMARY KEY(Client_Profile_Id, Product_Preference_Id),
    FOREIGN KEY(Client_Profile_Id) REFERENCES Client_Profile(Client_Profile_Id),
    FOREIGN KEY(Product_Preference_Id) REFERENCES Product_Preference(Product_Preference_Id)
);
