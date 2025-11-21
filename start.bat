@echo off
echo ========================================
echo   Starting Project Online
echo ========================================
echo.

echo [1/3] Starting Backend Server...
start "Backend Server" cmd /k "cd /d %~dp0backend && npm start"

echo Waiting for Backend to initialize...
timeout /t 5 /nobreak >nul

echo.
echo [2/3] Starting Admin Panel...
start "Admin Panel" cmd /k "cd /d %~dp0admin && npm start"

echo Waiting for Admin Panel to initialize...
timeout /t 5 /nobreak >nul

echo.
echo [3/3] Opening Frontend...
start "" "%~dp0frontend\index.html"

echo.
echo ========================================
echo   All services started successfully!
echo ========================================
echo.
echo Backend Server:  http://localhost:5000
echo Admin Panel:     http://localhost:3000
echo Frontend:        frontend/index.html
echo.
echo Press any key to exit...
pause >nul
