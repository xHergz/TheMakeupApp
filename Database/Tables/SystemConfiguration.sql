CREATE TABLE System_Configuration
(
    System_Configuration_Id INT NOT NULL AUTO_INCREMENT,
    Config_Key VARCHAR(100) NOT NULL UNIQUE,
    Config_Value VARCHAR(50) NOT NULL,
    PRIMARY KEY(System_Configuration_Id)
);
