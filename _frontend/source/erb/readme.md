## Middleman template directory (.erb)

### layout/ ###
Store all the layout files here. The layout files should only have the base
layout (`html`, `head`, `body`, `script`, `style`).

### partial/ ###
Store all your partial files here! Partial files **CAN'T** include another partial file!
If you need multiple partial includes use the `module`!

The following files are needed to compile your `layout` properly, so **DON'T** modify or delete them:
- `_headjs_config.erb`
- `_require_bottom_part.erb`
- `_require_config.erb`
- `_require_head_part.erb`

If you're planning to use Handlebars in your project please put all of the Handlebars templates
into the `_handlebars_templates.erb` partial file!

### module/ ###
Bigger blocks, modules with multiple partial includes.