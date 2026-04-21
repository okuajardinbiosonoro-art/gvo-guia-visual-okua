@echo off
setlocal enabledelayedexpansion

pushd "%~dp0.."

where node >nul 2>nul
if errorlevel 1 (
  echo Node.js no encontrado.
  popd
  exit /b 1
)

where npm >nul 2>nul
if errorlevel 1 (
  echo npm no encontrado.
  popd
  exit /b 1
)

echo Building GVO for local Windows pilot...
call npm run build
if errorlevel 1 (
  popd
  exit /b !errorlevel!
)

echo.
echo Starting GVO local pilot...
echo Backend + frontend compiled will be served from Fastify.
echo Expected URL: http://localhost:3001
echo.

call npm run start:local --workspace=apps/server
set "EXIT_CODE=!errorlevel!"

popd
exit /b !EXIT_CODE!
