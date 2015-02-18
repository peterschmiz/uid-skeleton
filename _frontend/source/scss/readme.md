## SCSS (SASS) source files

Every directory has an `.scss` file with the same name. These files are used
to combine the files in that directory, so it's easier to use them in the main `app.scss`

### `base` directory

In this directory only files are stored which won't generate any real CSS.

So they just store variables, settings, definitions (e.g. mixins and functions).

**DON'T** put any partial or module files here!

### `layout` directory

Main, big structural elements are defined here. Try not to add extra files here, because
you can use `module` or `partial`.

Only major parts are defined here, like header, footer, navigation etc.

### `module` directory

You can define complex site parts here which can't be fit into the layout.

Modules usually combine multiple partials and are bigger than partial files.

### `partial` directory

Site partials are stored here. You can create as many as you want, but try to keep
it DRY and be modular!

There are some pre-defined partials, you can either use them or create new ones!

### `vendor` directory

Any 3rd party SASS library or mixin, function should be put here. We currently
use `bourbon`, `normalize`, `csswizardy-grid`, `nanoscroller` and `selectboxit`.

If you use some Javascript library which comes with some theme you should convert
it's CSS into SASS and put it here (like it was did with `nanoscroller` or `selectboxit`.