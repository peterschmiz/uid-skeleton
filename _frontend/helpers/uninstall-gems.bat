@ECHO OFF
CLS

SETLOCAL
:PROMPT
SET /P AREYOUSURE=Do you want to uninstall all globally installed gems? (except Bundler (Y/[N])?
IF /I "%AREYOUSURE%" NEQ "Y" GOTO END

for i in `gem list --no-versions`; do gem uninstall -aIx $i; done

:END
ENDLOCAL
