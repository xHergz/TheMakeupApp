CREATE TABLE Artist_Service_Addon
(
    Artist_Service_Addon_Id INT NOT NULL AUTO_INCREMENT,
    Artist_Service_Id INT NOT NULL,
    Description VARCHAR(250) NOT NULL,
    Price DOUBLE(6, 2) NOT NULL,
    PRIMARY KEY(Artist_Service_Addon_Id),
    FOREIGN KEY(Artist_Service_Id) REFERENCES Artist_Service(Artist_Service_Id)
);
