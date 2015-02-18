## SASS, BEM cheat-sheet

### Basic rules 
 
- The main directory structure CAN'T be changed
- The files in these directories CAN'T be changed (read-only)
	- `partial/system/*`
	- `vendor/*`
- You can write your own partials, store them in `partial` directory
- You can write your own modules, store them in `module` directory
- Always check and setup the `base/_base.scss`
- Always store the used colors in the `base/_colors.scss`
- Always check and setup the `base/_sizing.scss`
- Always check and setup the `base/_namespace.scss`
- Always check and setup the `base/_font-family.scss`
- You can extend the functions and mixins (`base/_function.scss` and `base/_mixin.scss`)
- All of the .scss files should pass the SCSS Linter (grunt task, see [Grunt cheat-sheet](grunt-chear-sheet.md))
- You can rename the `app.scss`, but DON'T FORGET to update the `skeleton-config.json` and re-generate the `config.rb`

### BEM

- Always use the `modifier`, `element` mixins if you write BEM! (there are exceptions, eg. when you need to use @extend)
- Don't overuse BEM, check your logic

### Basic classes, namings

You can use the following classes on DOM elements:

#### Block related helper classes

- Full width box: `block--full-width`
- Full height box: `block--full-height`
- Full size box (100% width and height): `block--full-size`
- Centered box (horizontal, with margin auto): `block--centered`
- Spacing settings (padding, margin):
	- Box with base-spacing margin: `block--margin`
	- Box with base-spacing padding: `block--padding`
	- Box with horizontal (left-right) base-spacing padding: `block--hpadding`
	- Box with vertical (top-bottom) base-spacing padding: `block--vpadding`
	- Box with base-spacing padding, only on selected side: `block--padding-left`, `block--padding-top`...
	- Box with base-spacing margin, only on selected side: `block--margin-left`, `block--margin-top`...
- Position element verticaly (with :before, default alignment is middle): `block--vp`
- Position element verticaly to top: `block--vp block--vp-top`
- Position element verticaly to bottom: `block--vp block--vp-bottom`
- Position element absolutely: `block--absolute`
- Position element absolutely and set position: `block--to-top`, `block--to-left`...
- Stretch element (absolute stretching): `block--fill`
- Set background color: `block--bg--[$color]`

#### Text related helper classes

- Set text alignments: `text--align-left`, `text--align-right`...
- Set text size (sizes are defined in `base/_sizing.scss`): `text--size-12`, `text--size-14`...
- Use system font: `text--system-font`
- Use web-font (font names and styles are defined in `base/_font-family.scss`): `text--font-1`, `text--font-1-bold`
- No decoration: `text--no-decoration`
- No wrap (white-space: nowrap): `text--no-wrap`
- Uppercase: `text--uppercase`
- Lowercase: `text--lowercase`

### FAQ

#### Where do I set the base font size and name (not family!)
In the `base/_base.scss`

#### Where do I set the CSSWizardy Grid variables
In the `base/_base.scss`  
Never modify the CSSWizardy library in the `vendor` directory!

#### Where do I set the base spacing and other size values
In the `base/_sizing.scss`

#### Where do I set the namespacing variables
In the `base/_namespace.scss`