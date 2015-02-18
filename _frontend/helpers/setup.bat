@ECHO OFF
CLS

PUSHD ..
ECHO Installing Node modules (from package.json)...
START /WAIT cmd /c npm install --loglevel error
ECHO Node modules are installed!
ECHO Installing Bundler gem (globally)...
START /WAIT cmd /c gem install bundler --no-rdoc --no-ri --quiet
ECHO Bundler gem installed!
ECHO Installing Ruby gems (from Gemfile)
START /WAIT cmd /c bundle install --no-cache --path .bundle/gems
ECHO Package vendor files (cache)
START /WAIT cmd /c bundle package
ECHO Ruby gems are installed!
ECHO Running 'init-middleman' grunt task (creating config.rb)...
START /WAIT cmd /c grunt init-middleman
ECHO Middleman init done, config.rb generated!
POPD