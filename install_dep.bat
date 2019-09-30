@echo off
cls
WHERE npm install >nul
IF %ERRORLEVEL% NEQ 0 goto :nodeinstall

REM if node isn't installed guide them to the install page.

@echo on
npm install -d
@echo off
echo.
pause
exit

:nodeinstall
cls
echo.
echo  Node is not installed, it's needed^!
start "" https://nodejs.org/en/
echo.
pause
exit