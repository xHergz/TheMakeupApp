call npm run dev

IF %ERRORLEVEL%==0 (
    rd "C:\xampp\htdocs\TheMakeupApp\private" /s /q
    rd "C:\xampp\htdocs\TheMakeupApp\public" /s /q

    xcopy ".\Api" "C:\xampp\htdocs\TheMakeupApp\private\api\" /s /e
    xcopy ".\Css" "C:\xampp\htdocs\TheMakeupApp\public\css\" /s /e
    xcopy ".\dist" "C:\xampp\htdocs\TheMakeupApp\public\dist\" /s /e
    xcopy ".\Images" "C:\xampp\htdocs\TheMakeupApp\public\images\" /s /e
    xcopy ".\Pages" "C:\xampp\htdocs\TheMakeupApp\public\pages\" /s /e
    xcopy ".\Scripts" "C:\xampp\htdocs\TheMakeupApp\public\scripts\" /s /e
    xcopy ".\Templates" "C:\xampp\htdocs\TheMakeupApp\private\templates\" /s /e
    copy ".\.htaccess" "C:\xampp\htdocs\TheMakeupApp\public\.htaccess"
) ELSE (
    echo NPM Build Failed. Website Not Deployed.
)

pause
