@ECHO off

SET databaseName=TheMakeupApp
SET mysqlUsername=themakeupapp
SET hostname=localhost
ECHO Host: %hostname%
ECHO Database: %databaseName%
ECHO Username: %mysqlUsername%

REM Get user confirmation to drop the database
ECHO You are about to drop the entire database. ALL information will be lost.
ECHO Are you sure? (Y/N)
SET /p userConfirmation=

IF "%userConfirmation%"=="Y" (
    ECHO Dropping the database... You were warned.
    mysql -u %mysqlUsername% -p -h %hostname% -e "DROP DATABASE %databaseName%;"
) ELSE (
    ECHO Database has NOT been dropped.
)

ECHO Press any key to close...
SET /p closeWindow=