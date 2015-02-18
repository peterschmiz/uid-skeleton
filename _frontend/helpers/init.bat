@ECHO OFF
CLS

SETLOCAL
:PROMPT
SET /P AREYOUSURE=You are going to install (reset) UID skeleton. Are you sure (Y/[N])?
IF /I "%AREYOUSURE%" NEQ "Y" GOTO END

PUSHD ..
ECHO Clearing .bundle and node_modules and vendor/cache directories...
START /WAIT cmd /c rmdir node_modules /S /Q
ECHO node_modules directory cleared!
START /WAIT cmd /c rmdir .bundle /S /Q
ECHO .bundle directory cleared!
START /WAIT cmd /c rmdir vendor/cache /S /Q
ECHO vendor/cache directory cleared!
ECHO Installing 'grunt-cli' (globally)...
START /WAIT cmd /c npm install grunt-cli -g --loglevel error
ECHO 'grunt-cli' installed!
ECHO Installing 'karma-cli' (globally)...
START /WAIT cmd /c npm install karma-cli -g --loglevel error
ECHO 'karma-cli' installed!
ECHO Installing 'karma' (globally)...
START /WAIT cmd /c npm install karma@0.12.24 -g --loglevel error
ECHO 'karma' installed!
ECHO Installing 'karma-jasmine' (globally)...
START /WAIT cmd /c npm install karma-jasmine@0.2.3 -g --loglevel error
ECHO 'karma-jasmine' installed!
ECHO Installing Node modules (from package.json)...
START /WAIT cmd /c npm install --greedy --loglevel error
START /WAIT cmd /c npm dedupe -s
ECHO Node modules are installed!
ECHO Installing Bundler gem (globally)...
START /WAIT cmd /c gem install bundler --no-rdoc --no-ri --quiet
ECHO Bundler gem installed!
ECHO Package vendor files (cache)
START /WAIT cmd /c bundle package --gemfile=Gemfile --path .bundle/gems
ECHO Installing Ruby gems (from Gemfile)
START /WAIT cmd /c bundle install --gemfile=Gemfile --no-cache --path .bundle/gems --clean
ECHO Ruby gems are installed!
ECHO Running 'bower-install' grunt task...
START /WAIT cmd /c grunt bower-install
ECHO Bower install finished!
ECHO Running 'init-middleman' grunt task (creating config.rb)...
START /WAIT cmd /c grunt init-middleman
ECHO Middleman init done, config.rb generated!
POPD

:END
ENDLOCAL