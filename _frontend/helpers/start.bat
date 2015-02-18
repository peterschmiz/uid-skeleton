@ECHO OFF
CLS

REM  Checking the current directory
for %%* in (.) do set CurrDirName=%%~n*
@if not "%CurrDirName%" == "helpers" goto :DIRERROR

REM  Go one level up
PUSHD ..

REM  Run the init-temp grunt task
ECHO Running 'init-temp' grunt task...
START /WAIT cmd /c grunt init-temp

REM  Run the grunt parallel task
ECHO Start watchers in local development mode!
START cmd /c grunt parallel
POPD
goto :END

REM  Directory error
:DIRERROR
ECHO You're not running the start.bat from the helpers directory!

:END
Exit /B