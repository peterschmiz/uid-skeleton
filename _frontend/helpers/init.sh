#!/bin/bash

echo "Clearing .bundle and node_modules directories..."
cd ../../_frontend

sudo rm -r node_modules
echo "node_modules directory cleared!"
sudo rm -r .bundle
echo ".bundle directory cleared!"
sudo rm -r vendor/cache
echo "vendor/cache directory cleared!"

#
# Homebrew installed?
#

which -s brew

if [[ $? != 0 ]] ; then
    # Install Homebrew
    # https://github.com/mxcl/homebrew/wiki/installation
    echo "install Homebrew"
    sudo /usr/bin/ruby -e "$(curl -fsSL https://raw.github.com/gist/323731)"
else
    echo "brew installed, update, please wait fot the update"
    brew update
fi

#
#   Node installed?
#

which -s node

if [[ $? != 0 ]] ; then
    echo "node not installed"
    sudo brew install node
else
    echo "node installed, thx."
fi

#
#   Node package manager?
#

which -s npm

if [[ $? != 0 ]] ; then
    echo "npm not installed"
    sudo curl https://npmjs.org/install.sh | sh
else
    echo "npm installed, thx."
fi


#
# Grunt installed?
#

which -s grunt

if [[ $? != 0 ]] ; then
	echo "installing 'grunt-cli' (globally)..."
	sudo npm install grunt-cli -g
	echo "'grunt-cli' installed!"
else
    echo "grunt already installed"
fi

#
# Karma installed?
#

which -s karma

if [[ $? != 0 ]] ; then
	echo "Installing 'karma-cli' (globally)..."
	sudo npm install karma-cli -g --loglevel error
	sudo npm install karma -g --loglevel error
	echo "'karma-cli' installed!"
else
    echo "karma already installed"
fi

#
# Karma Jasmine installed?
#

which -s karma

if [[ $? != 0 ]] ; then
	echo "Installing 'karma-jasmine' (globally)..."
	sudo npm install karma-jasmine -g --loglevel error
	echo "'karma-jasmine' installed!"
else
    echo "karma-jasmine already installed"
fi


echo "Installing Node modules (from package.json)..."

sudo npm install --greedy --loglevel error
sudo npm install execSync --loglevel error
sudo npm dedupe -s

echo "Node modules are installed!"
echo "Installing Bundler gem (globally)..."

sudo gem install bundler --no-rdoc --no-ri --quiet

echo "Bundler gem installed!"

ruby -v
sudo bundle package --gemfile=Gemfile.go
sudo bundle install --gemfile=Gemfile --no-cache --clean

echo "Ruby gems are installed!"
echo Running 'bower-install' grunt task...

grunt bower-install

echo "Bower install finished!"
echo "Running 'init-middleman' grunt task (creating config.rb)..."

grunt init-middleman

echo "Middleman init done, config.rb generated!"