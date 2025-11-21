@echo off
echo ========================================
echo   Stopping Project Online
echo ========================================
echo.

echo Stopping Backend Server (Port 5000)...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :5000') do (
    taskkill /F /PID %%a >nul 2>&1
)

echo Stopping Admin Panel (Port 3000)...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3000') do (
    taskkill /F /PID %%a >nul 2>&1
)

echo.
echo ========================================
echo   All services stopped!
echo ========================================
echo.
echo Press any key to exit...
pause >nul
