@ECHO off

SET databaseName=TheMakeupApp
SET mysqlUsername=themakeupapp
SET hostname=localhost
SET backupPath=C:\HerWal\TheMakeupApp\Database Backups\
ECHO Host: %hostname%
ECHO Database: %databaseName%
ECHO Username: %mysqlUsername%
ECHO Backup Path: %backupPath%

REM Gets the current date in YYYY-MM-DD format. Source: https://gist.github.com/cjwinchester/64a921d1190aefb8eae1
for /f "skip=1" %%x in ('wmic os get localdatetime') do if not defined MyDate set MyDate=%%x
for /f %%x in ('wmic path win32_localtime get /format:list ^| findstr "="') do set %%x
set fmonth=00%Month%
set fday=00%Day%
set today=%Year%-%fmonth:~-2%-%fday:~-2%

mysqldump -u %mysqlUsername% -p -h %hostname% --protocol=tcp --port=3306 --default-character-set=utf8 --routines --skip-extended-insert --databases %databaseName% -r %databaseName%_%today%.sql

move %databaseName%_%today%.sql "%backupPath%%databaseName%_%today%.sql"

ECHO Press any key to close...
SET /p closeWindow=