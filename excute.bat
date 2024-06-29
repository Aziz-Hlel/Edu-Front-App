rmdir /s /q src
rmdir /s /q src-Excel
git clone https://github.com/tigana137/src-Excel.git

@echo off
setlocal enabledelayedexpansion

set "sourceFolder=src-Excel"
set "targetFolder=src"

if exist "%sourceFolder%" (
    ren "%sourceFolder%" "%targetFolder%"
    echo Folder renamed from "%sourceFolder%" to "%targetFolder%"
) else (
    echo Source folder "%sourceFolder%" not found.
)

npm run dev