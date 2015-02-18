# Skeleton install how-to
*Last updated: 08/02/2015*

## <a name="prerequisite"></a>Install prerequisite for the skeleton

Make sure you have installed __CORRECTLY__ the followings:

* Node.js
* GIT
* Ruby (2.0.x version, 32 bit)
* Java JRE 7 (for Google Closure Compiler .jar)

### <a name="node"></a>Node.js

Minimal required version: 0.10.12  
Download: [http://nodejs.org/download/](http://nodejs.org/download/)

Check if Node.js was added to your PATH (on Windows)!

[How to set PATH variable on Windows?](https://www.google.hu/webhp?sourceid=chrome-instant&rlz=1C1GPCK_enHU415HU415&ion=1&espv=2&ie=UTF-8#q=how+to+set+path+variable+in+windows&safe=off)

### GIT

Minimal required version: 1.8.5  
Download: [http://git-scm.com/downloads](http://git-scm.com/downloads)

**Check if GIT was added to your PATH (on Windows)!** 
For help see the [Node.js](#node) part!

Generate you private key to be able to use GitLab!
More info in our [Wiki](http://wiki.inet)
 
### Ruby<a name="ruby"></a>

Minimal required version: 2.0.0  
Download: [http://rubyinstaller.org/downloads/](http://rubyinstaller.org/downloads/)

**Check if Ruby was added to your PATH (on Windows)!**

**Ruby pathname fix**

Because `node_modules` directory could get huge and so having really long pathnames
we should patch the Ruby `pathname.rb` file!

Please copy the patched `pathname.rb` from the `ruby/fixes` directory and overwrite
the original one in you Ruby installation directory (eg. `c:\Ruby193\lib\ruby\2.0.0\`)

**Ruby DevKit install**

DevKit is needed for some gems, which aren't compiled, so we need the DevKit to do the compilation!
Skeleton won't install on Windows without having the DevKit properly installed! (middleman & wdm will fail)

Download the DevKit version (the proper one! check you installation).  
Extract the package to your Ruby installation folder under the `DevKit` directory. (you have to create it)!

After it's done enter the `DevKit` folder and run the following commands from command line (keep the order):

* ruby dk.rb init
* ruby dk.rb review
* ruby dk.rb install

**Important!**

If you want to use Ruby 2.0 or Ruby 2.1.5 don't use the 64bit version! It won't work (some of the gems arent available for 64bit platform)

### Java runtime (JRE)

Minimal required version: 1.7  
Download: [http://www.oracle.com/technetwork/java/javase/downloads/java-se-jre-7-download-432155.html](http://www.oracle.com/technetwork/java/javase/downloads/java-se-jre-7-download-432155.html)

Check if Java runtime was added to your PATH (on Windows)!

### Quick checklist

Open up a command line (it should work from everywhere, because of the `PATH` variable) and test the following commands:

* `node -v`: you should see the installed Node version (eg. `v.0.10.30`)
* `git --version`: you should see the installed GIT version (eg. `git version 1.8.4.msysgit.0`)
* `ruby -v`: you should see the installed Ruby version (eg. `ruby 2.0.0p598 (2014-11-13) [i386-mingw32]`) 

If any of the above is missing or giving you some error your installation is not valid!  
To use the skeleton properly you have to make sure that every part is installed correctly!

The easiest way to fix the installations uninstall every part and reinstall them one by one!

## Dowload / get the latest skeleton version

You can either download the skeleton from the browser, from GitHub or use the GIT command line
and clone it from there.

You have to have a registration on GitHub and you have to be added to the skeleton as a collaborator
to be able to download the files!

**GitLab page:**: [http://gitlab.dmz/frontend/skeleton](http://gitlab.dmz/frontend/skeleton)  
**GitLab download:** [http://gitlab.dmz/frontend/skeleton/repository/archive.zip](http://gitlab.dmz/frontend/skeleton/repository/archive.zip)

**GIT command line:** `git clone gitlab@gitlab.dmz:frontend/skeleton.git`  
(make sure, your GIT private keys are ok, and they are set in GitLab)

Delete the `.git` directory from the cloned directory! (you don't want to push/pull into skeleton from another project!)

## Setup / install the skeleton

The skeleton has multiple modules which use multiple softwares (this is why we needed to install the prerequisites)  
You can either run these install commands by hand or use one of the helpers from the `helpers` directory.

Currently all of the helpers are only available in batch format (Win).

**Use the `setup.bat` if you are not the first UID developer in the project!**
(so if there is already a `_frontend` a directory)

### Important steps before initializing / installing the skeleton

Make sure that you checked and updated / filled the `skeleton-config.json`! Parts of the install (eg. Bower, Grunt)
are using this config file to download and setup the skeleton!

Eg. clear the not needed Javascript libraries from the `script dependencies` and `mappings`!

Check the folders under the `directories` section!

### Install / init skeleton

`init.bat` is the file for installing skeleton related node modules & gems by running this batch file.

**Commands explained (used by the batch file)**

`START /WAIT cmd /c rmdir node_modules /S /Q`    
Removes the `node_modules` directory (/S and /Q are switches to delete recursively and silent)

`START /WAIT cmd /c rmdir .bundle /S /Q`  
Removes the `.bundle` directory

`START /WAIT cmd /c npm install grunt-cli -g`  
Installs the `grunt-cli` node module globally

`START /WAIT cmd /c npm install karma-cli -g`  
Installs the `karma-cli` (unit test module runner) node module globally

`START /WAIT cmd /c npm install karma@0.12.19 -g`  
Installs the `karma` (unit test) node module globally

`START /WAIT cmd /c npm install karma-jasmine@0.2.0 -g`  
Installs the `karma-jasmine` (Jasmine adapter) node module globally

`START /WAIT cmd /c npm install`
Installs the packages from `package.json`

`START /WAIT cmd /c npm dedupe`
Removes package duplications, flattens `node_modules` directory tree

`START /WAIT cmd /c gem install bundler --no-rdoc --no-ri`  
Installes the `bundler` Ruby gem globally

`START /WAIT cmd /c bundle install --no-cache --path .bundle/gems`  
Installs the needed gems locally (using the Gemfile)

`START /WAIT cmd /c grunt bower-install`  
Installs the needed Javascript libraries using Bower 

`START /WAIT cmd /c grunt init-middleman`  
Generates the `config.rb` (needed for the Middleman) from the `skeleton-config.json`

### Modify / clean skeleton

`delete-node-bundle.bat` is the batch file which clears (delete) `node_modules` and `.bundle` directories.

### Develop with skeleton

`start.bat` is the batch file for starting local development.

`start-prod.bat` is the batch file for starting templated, backend integrated development.

Of course you can use any of the grunt tasks, make sure you check what they do!

## Important informations, please read them!

### Ruby gems, global vs. local

Because on Windows we can't control which globally installed gem should be used (eg. SASS) we need to install
every gem locally, except the `bundler` gem, which is used globally!

So make sure, if you install gems manually always use the `bundler` with `--path .bundle/gems` option!

Because we installed the gems locally, we have to use the `bundle exec` command to run the gems!  

Don't install gems with the `gem install` command! (except the `bundler` itself!)

Bundler uses the `Gemfile` to check which gems should be downloaded! Skeleton has a basic, up-to-date
`Gemfile`, don't modify it, only if it's needed and please contact [me](mailto:peter.schmiz@possible.com) before
you do that (if it's an important update we'll update the skeleton itself!)

You find more info about the `Gemfile` [here](http://bundler.io/v1.3/man/gemfile.5.html)

Don't change the skeleton directory structure!

Don't rename the `_frontend` directory!

### Important Middleman note on Windows

Unfortunately on Windows there is a path limitation (around 260 characters).

Because the `node_modules` directory can get really big it will break the latest Middleman (> 3.3.x).

**To avoid this always run `npm dedupe` after `npm install`!**

### Node modules

Node modules are downloaded and installed based on the `package.json` file. (more info [here](https://www.npmjs.org/doc/files/package.json.html))

You can update / install the packages by running from command line the `npm install` command!  
(especially when your project needs some extra node module to be installed!)

Always run `npm dedupe` after `npm install`!

### Ignore specific files & directories

It's very important not to commit / push the following files into the version control:  
(unfortunatelly for SVN there is no predefined ignore file, for GIT there is an updated `.gitignore` file)

* Gemfile.lock (because we don't want to change the `Gemfile` itself, there is no need to lock it)
* config.rb (it's generated from the `skeleton-config.json`, modifications should be done there)
* any reporting file (eg. `scss-lint-report.xml`)
* `node_modules` directory
* `.bundle` directory

## Troubleshooting

### Can't install node modules
Check if node itself is installed correctly! (see [prerequisites](#prerequisite) part)

### Can't install gems with bundler
Check if Ruby itself is installed correctly! (see [prerequisites](#prerequisite) part)  
Check if Bundler is installed globally! (run in command line `gem list`, you should see Bundler there)  
Check if your `Gemfile` is valid and it's in the root of the `_frontend` folder!
Check if your Ruby version is fixed (SSL error, see the certificate file under the `ruby/fixes`)
More info here: [Workaround RubyGems' SSL errors on Ruby for Windows](https://gist.github.com/luislavena/f064211759ee0f806c88)

### Can't install all of the gems, native gems can't be compiled (eg. wdm)
Check if Ruby DevKit is installed correctly! (see [prerequisites](#prerequisite) part)

### Can't run grunt tasks
Check if `grunt-cli` is intalled globally and `Gruntfile.js` is present and correct!  
Check your `skeleton-config.json`! Check for typos!

### Can't start middleman
Check if every gem is installed (middleman does not need node modules to run)!  
Check if native gems (eg. wdm) could be compiled!  
To see what's the exact problem is use the following command: `bundle exec middleman build`

Check if the [pathname fix](#ruby) (`ruby/fixes/pathname.rb`) is copied over Ruby's original
pathname.rb! On Windows Middleman can't handle path names longer than 260 character!

### Lot of Javascript library errors (404, can't find, etc.)
Check if proper Javascript libraries were download by Bower and copied to the right place!  
You could try to fix it by running the `grunt bower-install` task from command line!



