@echo off
setlocal

set "PROJECT_DIR=%~dp0"
set "PYTHON_PACKAGES=%PROJECT_DIR%backend\venv\Lib\site-packages"
set "URL=http://127.0.0.1:5000"

where py >nul 2>&1
if errorlevel 1 (
    echo No se encontro Python en este equipo.
    pause
    exit /b 1
)

if not exist "%PYTHON_PACKAGES%\flask\__init__.py" (
    echo No se encontraron las dependencias del proyecto en backend\venv.
    pause
    exit /b 1
)

set "PYTHONPATH=%PYTHON_PACKAGES%"
powershell -NoProfile -Command "try { if ((Invoke-WebRequest -Uri '%URL%' -UseBasicParsing -TimeoutSec 2).StatusCode -eq 200) { exit 0 } } catch { exit 1 }; exit 1" >nul 2>&1
if errorlevel 1 (
    start "Mesa Magica - servidor" /D "%PROJECT_DIR%backend" py app.py
    for /L %%i in (1,1,30) do (
        powershell -NoProfile -Command "try { if ((Invoke-WebRequest -Uri '%URL%' -UseBasicParsing -TimeoutSec 2).StatusCode -eq 200) { exit 0 } } catch { exit 1 }; exit 1" >nul 2>&1
        if not errorlevel 1 goto abrir_pagina
        timeout /t 1 /nobreak >nul
    )
    echo El servidor no respondio. Revisa la ventana del servidor para ver el error.
    pause
    exit /b 1
)

:abrir_pagina
start "" "%URL%"

endlocal