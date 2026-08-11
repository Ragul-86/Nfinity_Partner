@echo off
cd /d D:\DMAX\Nfinity_Partner\nfinity\nfinity-website\client
npm run build > build-output.log 2>&1
echo BUILD_EXIT_CODE=%ERRORLEVEL% >> build-output.log
