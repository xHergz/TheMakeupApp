@ECHO off

SET cnfFile=./TheMakeupApp.cnf
SET databaseName=TheMakeupApp
ECHO CNF File: %cnfFile%
ECHO Database: %databaseName%

REM Create the database
call:runMySqlCommand "CREATE DATABASE IF NOT EXISTS %databaseName%;"

REM Create the Tables
call:runMySqlFile "./Tables/SystemConfiguration.sql"
call:runMySqlFile "./Tables/User.sql"
call:runMySqlFile "./Tables/Session.sql"
call:runMySqlFile "./Tables/SessionAction.sql"
call:runMySqlFile "./Tables/SessionLog.sql"
call:runMySqlFile "./Tables/UserAction.sql"
call:runMySqlFile "./Tables/UserLog.sql"
call:runMySqlFile "./Tables/HairColour.sql"
call:runMySqlFile "./Tables/EyeColour.sql"
call:runMySqlFile "./Tables/SkinTone.sql"
call:runMySqlFile "./Tables/ClientProfile.sql"
call:runMySqlFile "./Tables/HeadshotType.sql"
call:runMySqlFile "./Tables/ClientHeadshot.sql"
call:runMySqlFile "./Tables/AllergySensitivity.sql"
call:runMySqlFile "./Tables/ClientAllergySensitivity.sql"
call:runMySqlFile "./Tables/ProductPreference.sql"
call:runMySqlFile "./Tables/ClientProductPreference.sql"
call:runMySqlFile "./Tables/ArtistApplication.sql"
call:runMySqlFile "./Tables/ArtistCredential.sql"
call:runMySqlFile "./Tables/ExistingPortfolioLink.sql"
call:runMySqlFile "./Tables/SanitizationQuizQuestion.sql"
call:runMySqlFile "./Tables/SanitizationQuizAnswer.sql"
call:runMySqlFile "./Tables/SanitizationQuizSubmission.sql"
call:runMySqlFile "./Tables/MakeoverType.sql"
call:runMySqlFile "./Tables/ServiceType.sql"
call:runMySqlFile "./Tables/ConsultationType.sql"
call:runMySqlFile "./Tables/ArtistPortfolio.sql"
call:runMySqlFile "./Tables/ArtistMakeoverOffered.sql"
call:runMySqlFile "./Tables/ArtistService.sql"
call:runMySqlFile "./Tables/ArtistServiceConsultation.sql"
call:runMySqlFile "./Tables/ArtistServiceAddon.sql"
call:runMySqlFile "./Tables/ArtistQualification.sql"
call:runMySqlFile "./Tables/ArtistPortfolioPicture.sql"
call:runMySqlFile "./Tables/MakeoverAppointment.sql"
call:runMySqlFile "./Tables/MakeoverAppointmentAddon.sql"

REM Create the Views
call:runMySqlFile "./Views/FullSessionLog.sql"
call:runMySqlFile "./Views/FullUserLog.sql"

REM Create the Functions
call:runMySqlFile "./Functions/IsUserEmailAvailable.sql"
call:runMySqlFile "./Functions/IsUserDisplayNameAvailable.sql"
call:runMySqlFile "./Functions/DoesSessionOwnUser.sql"

REM Create the Stored Procedures
call:runMySqlFile "./Stored Procedures/LogSessionCreation.sql"
call:runMySqlFile "./Stored Procedures/LogSessionDeactivation.sql"
call:runMySqlFile "./Stored Procedures/CreateSession.sql"
call:runMySqlFile "./Stored Procedures/DeactivateSession.sql"
call:runMySqlFile "./Stored Procedures/LogUserCreation.sql"
call:runMySqlFile "./Stored Procedures/LogUserUpdate.sql"
call:runMySqlFile "./Stored Procedures/LogUserDeactivation.sql"
call:runMySqlFile "./Stored Procedures/CreateUser.sql"
call:runMySqlFile "./Stored Procedures/UpdateUser.sql"
call:runMySqlFile "./Stored Procedures/DeactivateUser.sql"
call:runMySqlFile "./Stored Procedures/GetUsersPasswordHash.sql"

REM Insert the initial data
call:runMySqlFile "./Data/SystemConfigurationData.sql"
call:runMySqlFile "./Data/UserActionData.sql"
call:runMySqlFile "./Data/SessionActionData.sql"
call:runMySqlFile "./Data/HairColourData.sql"
call:runMySqlFile "./Data/EyeColourData.sql"
call:runMySqlFile "./Data/SkinToneData.sql"
call:runMySqlFile "./Data/HeadshotTypeData.sql"
call:runMySqlFile "./Data/AllergySensitivityData.sql"
call:runMySqlFile "./Data/ProductPreferenceData.sql"
call:runMySqlFile "./Data/SanitizationQuizQuestionData.sql"
call:runMySqlFile "./Data/SanitizationQuizAnswerData.sql"
call:runMySqlFile "./Data/MakeoverTypeData.sql"
call:runMySqlFile "./Data/ServiceTypeData.sql"
call:runMySqlFile "./Data/ConsultationTypeData.sql"

ECHO Press any key to close...
SET /p closeWindow=

goto:eof

:runMySqlCommand
ECHO Executing command: %~1
mysql --defaults-extra-file=%cnfFile% -e "%~1"
goto:eof

:runMySqlFile
ECHO Running file: %~1
mysql --defaults-extra-file=%cnfFile% %databaseName% < "%~1"
goto:eof