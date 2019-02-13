CREATE TABLE Client_Profile
(
    Client_Profile_Id INT NOT NULL AUTO_INCREMENT,
    User_Id INT NOT NULL,
    Profile_Picture_Url VARCHAR(2048),
    Biography VARCHAR(500),
    Eye_Colour_Id INT NOT NULL,
    Hair_COlour_Id INT NOT NULL,
    PRIMARY KEY(Client_Profile_Id),
    FOREIGN KEY(User_Id) REFERENCES User(User_Id),
    FOREIGN KEY(Eye_Colour_Id) REFERENCES Eye_Colour(Eye_Colour_Id),
    FOREIGN KEY(Skin_Tone_Id) REFERENCES Skin_Tone(Skin_Tone_Id)
);