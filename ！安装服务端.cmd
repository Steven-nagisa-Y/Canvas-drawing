@echo off
color 0e
echo.
echo -*- �����㰲װnode.js -*-
echo.
echo.
pause
cd /d %~dp0
echo %~dp0
echo.
echo ��װnode.msi
echo ȫ����� Next
echo ��ɺ����������
node.msi
pause
echo ���з����
echo.
node server.js
echo.
echo GMS.icu
echo.
pause&exit
