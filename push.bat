@echo off
cd /d "%~dp0"
git add .
git commit -m "Update: %date% %time%"
git push origin main
echo.
echo Done! Changes pushed to GitHub.
pause
