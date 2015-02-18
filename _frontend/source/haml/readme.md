## Middleman template directory (.haml)

### layout/ ###
Store all the layout files here. The layout files should only have the base
layout (`html`, `head`, `body`, `script`, `style`).

### partial/ ###
Store all your partial files here! Partial files **CAN'T** include another partial file!
If you need multiple partial includes use the `module`!

### module/ ###
Bigger blocks, modules with multiple partial includes.