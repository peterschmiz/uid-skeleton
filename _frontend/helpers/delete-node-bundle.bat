@ECHO OFF
CLS

SETLOCAL
:PROMPT
SET /P AREYOUSURE=Are you sure to delete node_modules and bundle directories (Y/[N])?
IF /I "%AREYOUSURE%" NEQ "Y" GOTO END

ECHO Clear .bundle and node_modules directories...
PUSHD ..
START /WAIT cmd /c rmdir node_modules /S /Q
ECHO node_modules directory cleared
START /WAIT cmd /c rmdir .bundle /S /Q
ECHO .bundle directory cleared
POPD

:END
ENDLOCAL