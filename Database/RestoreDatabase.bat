@ECHO off

SET cnfFile=./TheMakeupApp.cnf
SET databaseName=TheMakeupApp
SET backupPath=C:\Program Files\HerWal\TheMakeupApp\Database Backups\
ECHO CNF File: %cnfFile%
ECHO Database: %databaseName%
SET /p backupDate="Backup Date (YYYY-MM-DD): "

mysql --defaults-extra-file=%cnfFile% < "%backupPath%%databaseName%_%backupDate%.sql"

ECHO Press any key to close...
SET /p closeWindow=