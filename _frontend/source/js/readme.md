## Javascript files

### lib/ ###
External, third-party libraries (e.g. jQuery, HammerJS, Handlebars, Require, Modernizr)

If you need some library to used separatedly, than put it into the `standalone` directory and
the build process won't concatenate them together with the other libraries.

### module/ ###
Modular files (app modules, require modules)

### plugin/ ###
Plugins, don't put libraries here! Only plugins!

If you have plugins with **Immediately-Invoked Function Expression** pattern you should put them
into the `iife` directory, so the compiler will put the into the right place.

(if the depend on jQuery for example they should be put after jQuery)

### util/ ###
Small code snippets, util files, codes. Don't put plugins here!