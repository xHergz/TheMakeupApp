@ECHO off

SET databaseName=TheMakeupApp
SET mysqlUsername=themakeupapp
SET hostname=localhost
SET backupPath=C:\HerWal\TheMakeupApp\Database Backups\
ECHO Host: %hostname%
ECHO Database: %databaseName%
ECHO Username: %mysqlUsername%
SET /p backupDate="Backup Date (YYYY-MM-DD): "

mysql -u %mysqlUsername% -p -h %hostname% < "%backupPath%%databaseName%_%backupDate%.sql"

ECHO Press any key to close...
SET /p closeWindow=