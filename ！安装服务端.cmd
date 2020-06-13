@echo off
color 0e
echo.
echo -*- 帮助你安装node.js -*-
echo.
echo.
pause
cd /d %~dp0
echo %~dp0
echo.
echo 安装node.msi
echo 全部点击 Next
echo 完成后按任意键继续
node.msi
pause
echo 运行服务端
echo.
node server.js
echo.
echo GMS.icu
echo.
pause&exit
