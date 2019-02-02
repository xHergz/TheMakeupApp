@ECHO off

SET databaseName=TheMakeupApp
SET mysqlUsername=themakeupapp
SET hostname=localhost
ECHO Database: %databaseName%
ECHO Username: %mysqlUsername%
SET /p mysqlPassword="Password: "
cls

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

REM Insert the initial data
call:runMySqlFile "./Data/SystemConfigurationData.sql"
call:runMySqlFile "./Data/UserActionData.sql"
call:runMySqlFile "./Data/SessionActionData.sql"

ECHO Press any key to close...
SET /p closeWindow=

goto:eof

:runMySqlCommand
ECHO Executing command: %~1
mysql -h %hostname% -u %mysqlUsername% -p"%mysqlPassword%" -e "%~1"
goto:eof

:runMySqlFile
ECHO Running file: %~1
mysql -h %hostname% -u %mysqlUsername% -p"%mysqlPassword%" %databaseName% < "%~1"
goto:eof