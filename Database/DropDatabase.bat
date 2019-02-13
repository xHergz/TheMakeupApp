@ECHO off

SET cnfFile=./TheMakeupApp.cnf
SET databaseName=TheMakeupApp
ECHO CNF File: %cnfFile%
ECHO Database: %databaseName%

REM Get user confirmation to drop the database
ECHO You are about to drop the entire database. ALL information will be lost.
ECHO Are you sure? (Y/N)
SET /p userConfirmation=

IF "%userConfirmation%"=="Y" (
    ECHO Dropping the database... You were warned.
    mysql --defaults-extra-file=%cnfFile% -e "DROP DATABASE %databaseName%;"
) ELSE (
    ECHO Database has NOT been dropped.
)

ECHO Press any key to close...
SET /p closeWindow=