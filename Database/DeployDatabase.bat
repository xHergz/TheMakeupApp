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
REM call:runMySqlFile "./Tables/Table.sql"

REM Create the Views
REM call:runMySqlFile "./Views/View.sql"

REM Create the Functions
REM cal:runMySqlFile "./Functions/Function.sql"

REM Create the Stored Procedures
REM call:runMySqlFile "./Stored Procedures/StoredProcedure.sql"

REM Insert the initial data
REM call:runMySqlFile "./Data/Data.sql"

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