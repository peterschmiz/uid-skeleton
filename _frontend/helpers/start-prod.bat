@ECHO OFF
CLS

REM  Checking the current directory
for %%* in (.) do set CurrDirName=%%~n*
@if not "%CurrDirName%" == "helpers" goto :DIRERROR

REM  Go one level up
PUSHD ..

REM  Run the grunt parallel task
Echo Start watchers in production development mode!
START cmd /c grunt parallel:prod
POPD
goto :END

REM  Directory error
:DIRERROR
ECHO You're not running the start-prod.bat from the helpers directory!

:END
Exit /B
