@echo off
cd /d "%~dp0"
echo === Kairos V2 - GitHub Push Script ===
echo.

:: Step 1: Initialize git if not already done
if not exist ".git" (
    echo [1/4] Initializing git repository...
    git init
    git branch -M main
) else (
    echo [1/4] Git already initialized.
)

:: Step 2: Create new GitHub repo (requires gh CLI)
echo [2/4] Creating GitHub repository Kairos-V2...
gh repo create Kairos-V2 --public --description "Kairos V2 - AI-Powered Opportunity Inbox Ranker | National AI Hackathon 2026" 2>nul || echo    (repo may already exist, continuing...)

:: Step 3: Set remote
echo [3/4] Setting remote origin...
git remote remove origin 2>nul
git remote add origin https://github.com/MuhammadSubhan404x/Kairos-V2.git

:: Step 4: Commit and push
echo [4/4] Committing and pushing all files...
git add .
git commit -m "feat: Kairos V2 - AI Opportunity Inbox Ranker (National AI Hackathon 2026)"
git push -u origin main

echo.
echo ========================================
echo  SUCCESS! Kairos V2 is now on GitHub:
echo  https://github.com/MuhammadSubhan404x/Kairos-V2
echo ========================================
pause
