@echo off
cd /d "%~dp0eastcoastev"

if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
)

echo Starting dev server on http://localhost:5199 ...
call npm run dev -- --port 5199 --strictPort

pause
